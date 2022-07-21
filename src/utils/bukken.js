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
}
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

export function getObjectKind(object_kind) {
    switch (object_kind) {
        case OtherObjectKind.Bukken:
            return "物件";
        case OtherObjectKind.Exterior:
            return "外装・エクステリア";
        case OtherObjectKind.RoomSpace:
            return "部屋・スペース";
        case OtherObjectKind.Interior:
            return "建具・インテリア";
        case OtherObjectKind.Furniture:
            return "家具";
        case OtherObjectKind.HomeAppliances:
        case "5":
            return "家電";
        case OtherObjectKind.Facilities:
        case "6":
            return "設備";
        case OtherObjectKind.Other:
        case "7":
            return "その他";
        default:
            return "-";
    }
}

/**
 *
 * @param {Buken} bukken
 * @returns ex: a7fff7a8-e72e-465c-9073-88114ad2b216/000001/thumnail.jpeg
 */
export function getBukenCoverImageS3Path(bukken) {
    return `${bukken?.user_id}/${bukken?.id}/thumnail.jpeg`;
}

export function getBukenCoverImage(bukken) {
    return `${process.env.NEXT_PUBLIC_CDN_RESOURCE}/${getBukenCoverImageS3Path(
        bukken
    )}`;
}

export function getDocumentUrlPath(document) {
    return getUrlPath(document.s3_file_name)
}

export function getUrlPath(s3FileName) {
    return `${process.env.NEXT_PUBLIC_CDN_RESOURCE}/${s3FileName}`;
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
