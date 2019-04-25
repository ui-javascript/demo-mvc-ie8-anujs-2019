const unitData = [
    {
        "code": "CHENHUA",
        "create_by": null,
        "create_date": "2018-10-17 15:01:17",
        "deleted": 0,
        "id": 1,
        "name": "辰华网络",
        "parent_id": null,
        "remark": null,
        "sort": 1,
        "status": 1,
        "type": 1,
        "update_by": null,
        "update_date": "2018-10-17 15:01:17"
    }, {
        "code": "DEVE",
        "create_by": null,
        "create_date": "2018-10-17 15:01:17",
        "deleted": 0,
        "id": 2,
        "name": "软件开发部",
        "parent_id": 1,
        "remark": null,
        "sort": 2,
        "status": 1,
        "type": 0,
        "update_by": null,
        "update_date": "2018-10-17 15:01:17"
    }, {
        "code": "SUPP",
        "create_by": null,
        "create_date": "2018-10-17 15:01:17",
        "deleted": 0,
        "id": 3,
        "name": "应用支持部",
        "parent_id": 1,
        "remark": null,
        "sort": 3,
        "status": 1,
        "type": 0,
        "update_by": null,
        "update_date": "2018-10-17 15:01:17"
    }, {
        "code": "QUAL",
        "create_by": null,
        "create_date": "2018-10-17 15:01:17",
        "deleted": 0,
        "id": 4,
        "name": "计划质量部",
        "parent_id": 1,
        "remark": null,
        "sort": 4,
        "status": 1,
        "type": 0,
        "update_by": null,
        "update_date": "2018-10-17 15:01:17"
    }, {
        "code": "PWDC",
        "create_by": null,
        "create_date": "2018-10-17 15:01:17",
        "deleted": 0,
        "id": 100,
        "name": "平圩电厂",
        "parent_id": null,
        "remark": null,
        "sort": 100,
        "status": 1,
        "type": 1,
        "update_by": null,
        "update_date": "2018-10-17 15:01:17"
    }, {
        "code": "PWYQ",
        "create_by": null,
        "create_date": "2018-10-17 15:01:17",
        "deleted": 0,
        "id": 101,
        "name": "平圩一期",
        "parent_id": 100,
        "remark": null,
        "sort": 101,
        "status": 1,
        "type": 0,
        "update_by": null,
        "update_date": "2018-10-17 15:01:17"
    }];

formatUnitData(unitData);
console.log(unitData);

function formatUnitData(_data, key, nameKey, parentKey, unitTypeKey, unitTypeValue) {
    key = key || 'id';
    nameKey = nameKey || 'name';
    parentKey = parentKey || 'parent_id';
    unitTypeKey = unitTypeKey || 'type';
    unitTypeValue = unitTypeValue || 1;
    if (!_data || !_data.length) {
        return null;
    }

    for (let p = 0; p < _data.length; p++) {
        if (_data[p].type !== unitTypeValue && _data[p][parentKey] !== undefined) {
            const ps = findUnit(_data[p]);
            _data[p]._unitId = ps[key];
            _data[p]._unitName = ps[nameKey];
        }
    }

    function findUnit(_item) {
        for (let i = 0; i < _data.length; i++) {
            if (_data[i][key] === _item[parentKey] && _data[i][unitTypeKey] === unitTypeValue) {
                return _data[i];
            } else if(_data[i][key] === _item[parentKey]){
                return findUnit(_data[i]);
            }else{
                continue;
            }
        }
    }
}