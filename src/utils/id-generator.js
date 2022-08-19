import {API} from "aws-amplify";
import * as queries from "../graphql/queries";
// import * as customQueries from "../graphql/custom-queries";

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
    /**
     {
        "data": {
            "getNextDocumentId": "{\"statusCode\":200,\"body\":{\"nextId\":\"000002\"}}"
        }
        }
     */
    const response = await API.graphql({
        query: queries.getNextDocumentId,
    });
    const data = JSON.parse(response.data.getNextDocumentId);
    console.log("getNextDocumentId... ", {data, nextId: data.body.nextId});
    return data.body.nextId;
    /*
    const response = await API.graphql({
        query: queries.queryBukkenBySort,
        variables,
    });
    const items = response.data.queryBukkenBySort.items;
    const bukken = items?.length > 0 ? items[0] : null;
    const bukkenIdNumber = bukken ? parseInt(bukken.id) : 0;
    return padLeadingZeros(bukkenIdNumber + 1);
    */
}

export async function getNextDocumentId() {
    /**
     {
        "data": {
            "getNextDocumentId": "{\"statusCode\":200,\"body\":{\"nextId\":\"000002\"}}"
        }
        }
     */
    const response = await API.graphql({
        query: queries.getNextDocumentId,
    });
    const data = JSON.parse(response.data.getNextDocumentId);
    console.log("getNextDocumentId... ", {data, nextId: data.body.nextId});
    return data.body.nextId;
    /*
    const response = await API.graphql({
        query: queries.queryDocumentBySort,
        variables,
    });
    const items = response.data.queryDocumentBySort.items;
    const data = items?.length > 0 ? items[0] : null;
    const idNumber = data ? parseInt(data.id) : 0;
    return padLeadingZeros(idNumber + 1);
    */
}

export async function getNextHistoryId() {
    /**
     {
        "data": {
            "getNextOtherObjectId": "{\"statusCode\":200,\"body\":{\"nextId\":\"000002\"}}"
        }
        }
     */
    const response = await API.graphql({
        query: queries.getNextHistoryId,
    });
    const data = JSON.parse(response.data.getNextHistoryId);
    console.log("getNextHistoryId... ", {data, nextId: data.body.nextId});
    return data.body.nextId;
    /*
    const response = await API.graphql({
        query: queries.queryHistoryBySort,
        variables,
    });
    const items = response.data.queryHistoryBySort.items;
    const data = items?.length > 0 ? items[0] : null;
    const idNumber = data ? parseInt(data.id) : 0;
    return padLeadingZeros(idNumber + 1);
    */
}

export async function getNextOtherObjectId() {
    /**
     {
        "data": {
            "getNextHistoryId": "{\"statusCode\":200,\"body\":{\"nextId\":\"000002\"}}"
        }
        }
     */
    const response = await API.graphql({
        query: queries.getNextOtherObjectId,
    });
    const data = JSON.parse(response.data.getNextOtherObjectId);
    console.log("getNextOtherObjectId... ", {data, nextId: data.body.nextId});
    return data.body.nextId;
    /*
    const response = await API.graphql({
        query: customQueries.queryOtherObjectBySortForNextID,
        variables,
    });
    const items = response.data.queryOtherObjectBySort.items;
    const data = items?.length > 0 ? items[0] : null;
    const idNumber = data ? parseInt(data.id) : 0;
    return padLeadingZeros(idNumber + 1);
    */
}
