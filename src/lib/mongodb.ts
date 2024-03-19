//src/lib/mongodb.ts
const { MongoClient } = require('mongodb');
const uri = process.env.NEXT_APP_MONGO_URI;
const client = new MongoClient(uri);

export const connectToDB = async (type: string, body: any, colName: string | null, idx: any) => {
    let db, collection, data;

    interface UpdateOperation {
        $push?: { [key: string]: any };
        $set?: { [key: string]: any };
    }


    await client.connect(); // 접속
    db = client.db('choding');
    collection = db.collection(colName);

    console.log('db접속', type, body, colName, idx)

    if (colName == 'LoginData' && body) { // 로그인 이메일 중복 방지
        let aaa = await collection.find({ email: body.email }).toArray();
        if (aaa.length) return false;
    }



    switch (type) {
        case 'post': await collection.insertOne(body);
            break;

        case 'detail':
            const query = { postId: Number(body.postId) };
            data = await collection.findOne(query);
            if (data === null) {
                console.log(`문서를 찾을 수 없음: ${JSON.stringify(query)}`);
            }
            break;

        case 'delete':
            data = await collection.deleteOne(body);
            break;

        case 'put':
            const updateQuery = { [body.updateKey]: body.updateValue };
            let updateOperation: UpdateOperation = {};

            if (body.updateType === 'push') {
                updateOperation.$push = { [body.field]: body.value };
            } else if (body.updateType === 'set') {
                updateOperation.$set = { [body.field]: body.value };
            } else {
                updateOperation.$set = body;
            }

            data = await collection.updateOne(updateQuery, updateOperation);
            break;
    }

    if (type != 'detail') data = await collection.find({}).toArray();

    if (colName == 'myPoint') {
        let data;
        switch (type) {
            case 'post': await collection.insertOne(body); break;
            case 'put': data = await collection.updateOne({ email: body.email }, { $set: { level: body.level, point: body.point } });
            case 'get': data = await collection.find({ email: body }).toArray();
        }
        return data
    }


    return data;
}