import {API} from "aws-amplify";
import * as queries from "../graphql/queries";

const variables = {
    sort: 1,
    sortDirection: "DESC",
    limit: 1,
};

function padLeadingZeros(num, size = 6) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

export async function getNextBukkenId() {
    const response = await API.graphql({
        query: queries.queryBukkenBySort,
        variables,
    });
    const items = response.data.queryBukkenBySort.items;
    const bukken = items?.length > 0 ? items[0] : null;
    const bukkenIdNumber = bukken ? parseInt(bukken.id) : 0;
    return padLeadingZeros(bukkenIdNumber + 1);
}

export async function getNextDocumentId() {
    const response = await API.graphql({
        query: queries.queryDocumentBySort,
        variables,
    });
    const items = response.data.queryDocumentBySort.items;
    const data = items?.length > 0 ? items[0] : null;
    const idNumber = data ? parseInt(data.id) : 0;
    return padLeadingZeros(idNumber + 1);
}

export async function getNextHistoryId() {
    const response = await API.graphql({
        query: queries.queryHistoryBySort,
        variables,
    });
    const items = response.data.queryHistoryBySort.items;
    const data = items?.length > 0 ? items[0] : null;
    const idNumber = data ? parseInt(data.id) : 0;
    return padLeadingZeros(idNumber + 1);
}

export async function getNextOtherObjectId() {
    const response = await API.graphql({
        query: queries.queryOtherObjectBySort,
        variables,
    });
    const items = response.data.queryOtherObjectBySort.items;
    const data = items?.length > 0 ? items[0] : null;
    const idNumber = data ? parseInt(data.id) : 0;
    return padLeadingZeros(idNumber + 1);
}