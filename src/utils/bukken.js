/**
・0　→　自宅
・1　→　別荘
・2　→　-
 * @param {*} bukken 
 */
export function getBukkenType(bukken) {
    switch(bukken.bukken_kind) {
        case "0": return "自宅";
        case "0": return "別荘";
        default: return "-"
    }
}