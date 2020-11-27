import {SummaryType, Context} from "expr_builder";

function dict(dataSource, table, lookupColumn, targetColumn, cacheSize = 10000) {
    return function (node) {
        return node.mapQuery({
            "cacheSize": cacheSize,
            "dataSource": dataSource,
            "targetTable": table,
            "targetColumns": [targetColumn],
            "query": [
                {
                    "column": lookupColumn,
                    "operator": "=",
                    "value": "$1"
                }
            ]
        })
    }
}

const ctx = new Context();
ctx
    .dataSource("his")
    .sourceTable("medrec", "pat_master_index")
    .fetchCount(500)
    .primaryKeys('patient_id')
    .outPrimaryKeys("source_patient_no")
    .parallel(10)
    .dbSink("demo", "etl_test", "patient_base_info_4", false, true)
    .name("patient_base_info_4");

const patient_id = ctx.column("medrec.pat_master_index.patient_id");
patient_id
    .output("source_patient_no");

const name = ctx.column("medrec.pat_master_index.name")
name
    .filter("$1")
    .output("patient_name");
name
    .map("$1|toPYCode|toUpper")
    .output("spell_code");
name
    .map("$1|toWBCode|toUpper")
    .output("wb_code");

const sex = ctx.column("medrec.pat_master_index.sex");
sex
    .map(`multiIf($1|contains("男"),"男性",$1|contains("女"),"女性","未知的性别")`)
    .output("sex_name");

const ybkh = ctx.column("medrec.pat_master_index.insurance_no");
const vipId = patient_id
    .mapQuery({
        "cacheSize": 0,
        "dataSource": "his",
        "targetTable": "medrec.pb_vip",
        "targetColumns": ["vip_no"],
        "query": [
            {
                "column": "patient_id",
                "operator": "=",
                "value": "$1"
            }
        ]
    });

const cardNoAlt = ctx.concat(ybkh, vipId);
cardNoAlt
    .map(`multiIf($1,"YBKH", $2,"JZKH")`)
    .output("card_type");
cardNoAlt
    .map("coalesce($1,$2)")
    .output("card_no");

ctx.const('true').output("is_valid");
ctx.const('now()').output("oper_time");


// 这里开始是你需要进行代码编写的地方
const date_of_birth = ctx.column("medrec.pat_master_index.date_of_birth");
date_of_birth
    .map("$1|toDate")
    .output("birth_date");

const birth_place = ctx.column("medrec.pat_master_index.birth_place");
birth_place
    .filter("$1")
    .output("birth_address_district");

// const id_no = ctx.column("medrec.pat_master_index.id_no");
// id_no
//     .map(`multiIf(length($1)=15, "居民身份证", length($1)=18, "居民身份证", "")`)
//     .output("id_type_name");
// id_no
//     .map(`multiIf(length($1)=15, "01", length($1)=18, "01", "")`)
//     .output("id_type_code");
// id_no
//     .filter("$1")
//     .output("id_no");





module.exports = ctx;