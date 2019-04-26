/**
 * 查询字符串解析
 *
 * eg.
 * let queryParams1 = queryParams("name=luo0412&ui=2");
 *      --> { name: "luo0412", ui: "2"}
 *
 * @param searchString
 */
export const queryParams =  (searchString) => {
    let query = {};
    const reg = new RegExp(/([^=&]+)=([^&]+)/g);
    searchString.replace(reg, function (full, key, value) {
        if(query[key] === undefined){
            query[key] = value;
        } else {

            // 1)数组追加 2)已存在的值 k-v都保存
            if (Object.prototype.toString.call(query[key]) === '[object Array]'){
                query[key].push(value);
            } else {
                query[key] = [query[key],value];
            }
        }
    });
    return query;
};
