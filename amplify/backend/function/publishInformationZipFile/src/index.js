/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_GRANDSPORTAL_BUCKETNAME
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
const s3Zip = require("s3-zip");

const region = process.env.REGION;
const bucket = process.env.STORAGE_GRANDSPORTAL_BUCKETNAME;

const s3 = new AWS.S3({region: region});

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const folder = event.arguments.folder;
    const zipFileName = event.arguments.zipFileName;

    console.log(
        `EVENT: ${JSON.stringify({region, bucket, zipFileName, folder})}`
    );

    const allFileNames = await listObjects(folder);
    const zipFileNames = allFileNames.filter(file => file.endsWith(".zip"))
    const docFileNames = allFileNames.filter(file => !file.endsWith(".zip"))

    console.log("listObjects... files = ", {allFileNames, zipFileNames, docFileNames});

    await deleteAllZipFile(folder, zipFileNames);

    try {
        const zipFilePath = await zipFiles(folder, docFileNames, zipFileName);
        return {
            statusCode: 200,
            body: {path: zipFilePath},
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.message,
        };
    }
};

async function deleteZipFile(zipFilePath) {
    console.log("deleteZipFile... start: ", zipFilePath)
    const params = {
        Bucket: bucket,
        Key: zipFilePath,
    };
    const data = await s3.deleteObject(params).promise();
    console.log("deleteZipFile... data: ", data)
}

async function deleteAllZipFile(folder, zipFileNames) {
    console.log("deleteAllZipFile... start: ", {folder, zipFileNames})
    return Promise.all(zipFileNames.map((zipFileName) => deleteZipFile(folder + zipFileName)))
}

async function listObjects(folder) {
    console.log("listObjects... start: ", folder);
    const params = {
        Bucket: bucket,
        Prefix: folder,
    };
    const data = await s3.listObjectsV2(params).promise();
    if (data.Contents && data.Contents.length > 0) {
        const fileNames =  data.Contents.map((item) => {
            const key = item.Key;
            const parsed = key.split("/");
            const fileName = parsed[parsed.length - 1];
            //exclude zip file
            // if (fileName.endsWith(".zip")) return null;
            return fileName
        });
        //filter null
        return fileNames;
    }
}

function zipFiles(folder, files, zipFileName = "archive.zip") {
    console.log("zipFiles... ", { folder, files, zipFileName })
    return new Promise((resolve, reject) => {
        // Create body stream
        try {
            const body = s3Zip.archive(
                {region: region, bucket: bucket},
                folder,
                files
            );
            const zipParams = {
                params: {Bucket: bucket, Key: folder + zipFileName},
            };
            const zipFile = new AWS.S3(zipParams);
            zipFile
                .upload({Body: body})
                .on("httpUploadProgress", function (evt) {
                    console.log(evt);
                })
                .send(function (e, r) {
                    if (e) {
                        console.log("zipFile.upload error " + e);
                        reject(e);
                    }
                    console.log("zipFile.upload success", r);
                    resolve(r.Key);
                });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}
