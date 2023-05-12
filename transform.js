const params = require("./params.json")
const target = require('./target.json')
const testData = require('./test.json')
// console.log(params, target);

// 规则：
// 没有id的对象不需要转换&&id>=8000的对象不需要转换
// 在id转换成name的时候，在id前加上“flaw_type_”拼接成name
// nickName是show属性的转换
// 子对象的nickName 是父对象的属性名为Attributes的兄弟对象的show属性加上“_”下划线，再加自身的show属性拼接而成。
// 在实际应用中，params.json 是因每个项目不同，子对象嵌套层数可能不同(可能嵌套两层、三层、四层......)，
// 但是格式不会发生变化，请在代码中考虑到通用化的情况。

const transformObj = (obj, parentName = "", result = []) => {
    // 获取所有属性值存到数组中再进行遍历
    for (let value of Object.values(obj)) {
        // 没有id的对象不需要转换&&id>=8000的对象不需要转换
        if (value.Attributes && value.Attributes.id && value.Attributes.id < 8000) {
            const name = `flaw_type_${value.Attributes.id}`;

            // 将父对象中的属性名和兄弟对象的show属性值进行拼接
            const nickName = parentName + value.Attributes.show

            result.push({ name, nickName: nickName });

            // 递归解决嵌套的情况
            transformObj(value, nickName + '_', result)
        }
    }
    return JSON.stringify(result);
    // return result
};

let result = transformObj(params)
console.log(result);

console.log(result === JSON.stringify(target));

let testResult = transformObj(testData)
console.log(testResult);