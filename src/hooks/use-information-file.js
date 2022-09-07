import {API, Storage} from "aws-amplify";
import {useCallback} from "react";
import * as Throttle from "promise-parallel-throttle";
import moment from "moment";
import {
    getInformationS3FileName,
    getInformationS3FilePath,
    getUrlPath,
} from "utils/bukken";
import {publishInformationZipFile} from "graphql/queries";

export const useInformationFile = () => {
    const uploadFileToS3 = useCallback(async (file, informationId) => {
        console.log("uploadFileToS3... start: ", file);
        //upload file
        const originFileName = `${file.name.replace(/ |　/g, "")}`;
        const s3FileNamePrefix = moment().format("YYYYMMDD_HHmmss");
        const s3FileName = getInformationS3FileName(
            informationId,
            `${s3FileNamePrefix}_${originFileName}`
        );

        //resize image first if it's image
        if (["jpeg", "jpg", "png", "JPEG", "JPG", "PNG"].includes(file.type)) {
            file = await resizeImage(file, 1280, 85);
        }
        const res = await Storage.put(s3FileName, file, {
            level: "public",
            contentType: file.type,
        });
        const urlPath = getUrlPath(s3FileName);
        return urlPath;
    }, []);

    const uploadFiles = useCallback(async (files, informationId) => {
        //first delete archive.zip file cause when user download list file, it will check exist archive.zip file to avoid duplidate zip
        const zipFileName = "archive.zip";
        //check zip file exist
        const zipFilePath = `information/${informationId}/${zipFileName}`;
        await Storage.remove(zipFilePath);
        //doing upload file process
        const queue = files.map(
            (file) => () => uploadFileToS3(file, informationId)
        );
        const res = await Throttle.all(queue, {maxInProgress: 5});
        console.log("useInformationFile... uploadFiles res = ", res);
        //doing zip file
        await zipInformationFile(informationId)
        return res;
    }, []);

    const getFilesFromS3 = useCallback(async (informationId) => {
        const informationS3Path = getInformationS3FilePath(informationId);
        const results = await Storage.list(informationS3Path);
        const files = results.map(({key, size}) => {
            const p = key.split("/");
            const name = p[p.length - 1];
            return {
                path: `${process.env.NEXT_PUBLIC_CDN_RESOURCE}/${key}`,
                name,
                size,
                key,
                uploaded: true,
            };
        });
        //we will filter to excludes zip file cause we will create archive.zip file at information folder to zip all file for client download
        return files.filter((file) => !file.name.endsWith(".zip"));
    }, []);

    const deleteFileFromS3 = useCallback(async (file) => {
        await Storage.remove(file.key);
    }, []);

    const deleteFilesFromS3 = useCallback(async (files) => {
        const queue = files.map((file) => () => deleteFileFromS3(file));
        await Throttle.all(queue, {maxInProgress: 5});
    }, []);

    const zipInformationFile = useCallback(async (informationId) => {
        const zipFileName = "archive.zip";
        //check zip file exist
        const zipFilePath = `information/${informationId}/${zipFileName}`;
        const results = await Storage.list(zipFilePath);
        const exist = results.length > 0;
        console.log("downloadZipFile... check zip file exist: ", {
            results,
            exist,
            zipFilePath,
        });
        if (exist) {
            //success zip file
            return `${process.env.NEXT_PUBLIC_CDN_RESOURCE}/${zipFilePath}`
        } else {
            //call api zip folder
            const res = await API.graphql({
                query: publishInformationZipFile,
                variables: {
                    folder: `public/information/${informationId}/`,
                    zipFileName,
                },
            });
            const result = JSON.parse(res.data.publishInformationZipFile);
            console.log("downloadZipFile... publishInformationZipFile res: ", {
                res,
                result,
            });
            if (result.statusCode == 200) {
                //success zip file
                return `${process.env.NEXT_PUBLIC_CDN_RESOURCE}/${zipFilePath}`
            }
        }
        return null;
    }, []);

    return {
        uploadFiles,
        getFilesFromS3,
        deleteFileFromS3,
        deleteFilesFromS3,
        zipInformationFile,
    };
};
