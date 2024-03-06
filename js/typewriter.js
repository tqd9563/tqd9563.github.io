let divTyping = document.getElementById('subtitle')
let i = 0, timer = 0
let isAdding = true // 设置一个开关变量，用来控制是添加文字还是删除文字

let arr = [
    '全心全意为全心服务.', 
    '上辈子拯救了银河系，这辈子才能遇见你', 
    '一饮一啄，莫非前定'
]

function getRandomElement(arr) {
    if (arr && arr.length) {
        const index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }
    return null; // 如果数组为空或未定义，则返回null
}

let str = getRandomElement(arr)
function typing () {
    if (i <= str.length && isAdding) {
        // 打字阶段
        divTyping.innerHTML = str.slice(0, i++) + '|'
        timer = setTimeout(typing, 100) // 200可以自己调整打字速度
    } else if (i > 0 && !isAdding) {
        // 删除阶段
        i--
        divTyping.innerHTML = str.slice(0, i) + '|'
        timer = setTimeout(typing, 70) // 100可以自己调整删除速度
    } else {
        // 完成打字或者删除后的下一步动作
        console.log('切换前:', isAdding)
        isAdding = !isAdding // 切换状态
        console.log('切换后:', isAdding)
        setTimeout(typing, 1800) // 停顿一会儿后再次打字或者删除
        if (isAdding) {
            // 切换为打字模式, 重新随机选择字符串
            // console.log('切换为打字模式, 准备随机选择字符串.')
            str = getRandomElement(arr) // 在if语句块内部不能用const或者let，否则生成的是新的局部变量，无法影响外部使用的str
            // console.log('随机到的字符串为:', str)
        }
    }
}

typing()