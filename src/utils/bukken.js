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
        case "0":
            return "別荘";
        default:
            return "-";
    }
}

export function getBukkenS3FileName(bukken, fileName) {
    return `${bukken.user_id}/${bukken.bukken_no}/${
        bukken.object_kind ?? "0"
    }/${fileName}`;
}

export function getObjectKind(object_kind) {
    switch (object_kind) {
        case "0":
            return "物件";
        case "1":
            return "外装・エクステリア";
        case "2":
            return "部屋・スペース";
        case "3":
            return "建具・インテリア";
        case "4":
            return "家具";
        case "5":
            return "家電";
        case "6":
            return "設備";
        case "7":
            return "その他";
        default:
            return "-";
    }
}
