/**
 * 将ID、ParentID这种数据格式转换为树格式
 *
 * @param _data
 * @param id
 * @param pid
 * @param childrenName
 * @param itemMap
 * @returns {Array}
 */
export const arrayToTree = function (_data, id, pid, childrenName, itemMap)
{

    function getKey(key) {
        if (typeof (key) == "string") key = key.replace(/[.]/g, '').toLowerCase();
        return key;
    }

    var id = id || "id";
    var pid = pid || "parent_id";
    var childrenName = childrenName || "children";
    if (!_data || !_data.length) return [];
    var data = _data;//这里可以拷贝数组
    var targetData = [];                    //存储数据的容器(返回)
    var records = {};
    var itemLength = data.length;           //数据集合的个数
    for (var i = 0; i < itemLength; i++) {
        var o = data[i];
        var key = getKey(o[id]);
        records[key] = o;
    }
    for (var i = 0; i < itemLength; i++) {
        var currentData = data[i];
        itemMap && (currentData = itemMap(currentData));
        var key = getKey(currentData[pid]);
        var parentData = records[key];
        if (!parentData) {
            targetData.push(currentData);
            continue;
        }
        parentData[childrenName] = parentData[childrenName] || [];
        parentData[childrenName].push(currentData);
        // data[i] = null;
    }
    return targetData;
};
