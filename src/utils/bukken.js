import * as R from "ramda";
import {
    ExteriorKind,
    FacilitiesKind,
    FurnitureKind,
    HomeAppliancesKind,
    InteriorKind,
    OtherKind,
    RoomKind,
} from "./global-data";

export const OtherObjectKind = {
    Bukken: "0",
    Exterior: "1",
    RoomSpace: "2",
    Interior: "3",
    Furniture: "4",
    HomeAppliances: "5",
    Facilities: "6",
    Other: "7",
};
export const OtherObjectFieldKind = {
    ReadyMadeProduct: "0",
    Order: "1",
};
/**
・0　→　自宅
・1　→　別荘
・2　→　-
 * @param {*} bukken 
 */
export function getBukkenType(bukken) {
    switch (bukken.bukken_kind) {
        case "0":
            return "自宅";
        case "1":
            return "別荘";
        default:
            return "-";
    }
}

export function getBukkenS3FileName(bukken, fileName) {
    return `${bukken.user_id}/${bukken.id}/${
        bukken.object_kind ?? "0"
    }/${fileName}`;
}

export function getDocumentUrlPath(document) {
    return getUrlPath(document.s3_file_name);
}

export function getUrlPath(s3FileName) {
    return `${process.env.NEXT_PUBLIC_CDN_RESOURCE}/${s3FileName}`;
}

export function getS3FromUrl(url) {
    return url.split("public/")[1];
}

/**
 * base on logic save file on s3: https://bjm.backlog.com/view/GRANDS_PORTAL_SITE-60#comment-110961690
 * @param {OtherObject} otherObject
 * @param {String} fileName
 * @returns
 */
export function getOtherObjectS3FileName(otherObject, fileName) {
    return `${otherObject.user_id}/${otherObject.bukken_id}/${otherObject.object_kind}-${otherObject.id}/${fileName}`;
}

export function getCoverImageS3FileNameForCreateRoom(
    bukken,
    nextRoomId,
    fileName
) {
    return `${bukken.user_id}/${bukken.id}/${OtherObjectKind.RoomSpace}-${nextRoomId}/${fileName}`;
}

export function getCoverImageS3FileNameForCreateInterior(
    bukken,
    nextOtherObjectId,
    fileName
) {
    return `${bukken.user_id}/${bukken.id}/${OtherObjectKind.Interior}-${nextOtherObjectId}/${fileName}`;
}

export function getCoverImageS3FileNameForCreateOtherObject(
    bukken,
    otherObjectKind,
    nextOtherObjectId,
    fileName
) {
    return `${bukken.user_id}/${bukken.id}/${otherObjectKind}-${nextOtherObjectId}/${fileName}`;
}

export function getBukkenCoverImageUrl(otherObject) {
    try {
        //parse field_list to get cover image with thumnail key
        const fieldList = otherObject.field_list
            ? JSON.parse(otherObject.field_list)
            : null;
        if (fieldList && fieldList["thumnail"]) {
            return fieldList["thumnail"];
        }
    } catch (e) {
        console.error(e);
    }
}

export function getRoomCoverImageUrl(otherObject) {
    try {
        //parse field_list to get cover image with thumnail key
        const fieldList = otherObject.field_list
            ? JSON.parse(otherObject.field_list)
            : null;
        if (fieldList && fieldList["thumnail"]) {
            return fieldList["thumnail"];
        }
    } catch (e) {
        console.error(e);
    }
}

/**
 *
 * @param {Bukken} bukken
 * @returns  String | null
 */
export function getBukkenCoverImageUrlByBukken(bukken) {
    const otherObjects = bukken.otherObjects.items;
    if (!R.isNil(otherObjects) && !R.isEmpty(otherObjects)) {
        return getBukkenCoverImageUrl(otherObjects[0]);
    }
    return null;
}

export const getKindCaption = (otherObjectKind) => {
    switch (otherObjectKind) {
        case OtherObjectKind.Interior:
            return "建具・収納";
        case OtherObjectKind.Furniture:
            return "家具・インテリア";
        case OtherObjectKind.HomeAppliances:
            return "家電";
        case OtherObjectKind.Facilities:
            return "設備・建材";
        case OtherObjectKind.Other:
            return "その他";
        case OtherObjectKind.Exterior:
            return "外装";
        case OtherObjectKind.RoomSpace:
            return "部屋・スペース";
        default:
            return "";
    }
};

export const getOtherObjectListUrl = (otherObjectKind) => {
    const route = getOtherObjectRouteUrl(otherObjectKind);
    if (route) return `${route}/list`;
    return "";
};

export const getOtherObjectRouteUrl = (otherObjectKind) => {
    switch (otherObjectKind) {
        case OtherObjectKind.Interior:
            return "/interior";
        case OtherObjectKind.Furniture:
            return "/furniture";
        case OtherObjectKind.HomeAppliances:
            return "/appliances";
        case OtherObjectKind.Facilities:
            return "/facility";
        case OtherObjectKind.Other:
            return "/other";
        default:
            return null;
    }
};

export const getOtherObjectSelectKind = (otherObjectKind) => {
    switch (otherObjectKind) {
        case OtherObjectKind.Interior:
            return InteriorKind;
        case OtherObjectKind.Furniture:
            return FurnitureKind;
        case OtherObjectKind.HomeAppliances:
            return HomeAppliancesKind;
        case OtherObjectKind.Facilities:
            return FacilitiesKind;
        case OtherObjectKind.Other:
            return OtherKind;
        case OtherObjectKind.Exterior:
            return ExteriorKind;
        case OtherObjectKind.RoomSpace:
            return RoomKind;
        default:
            return null;
    }
};

/**
 * base on logic save file on s3, see sheet "（想定）S３フォルダ構成" on file 【grandsポータルサイト構築】DynamoDB詳細設計_20220906
 * @param {String} informationId
 * @returns
 */
 export function getInformationS3FilePath(informationId) {
    return `information/${informationId}/`;
}
/**
 * base on logic save file on s3, see sheet "（想定）S３フォルダ構成" on file 【grandsポータルサイト構築】DynamoDB詳細設計_20220906
 * @param {String} informationId
 * @param {String} fileName
 * @returns
 */
 export function getInformationS3FileName(informationId, fileName) {
    return `information/${informationId}/${fileName}`;
}