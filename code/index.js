function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const BLOOD_DEFAULT = 400; // 默认血量
const PER_DEFAULT = 20; // 默认暴击率
const CRIT_DEFAULT = 2; // 暴击翻倍
const CRIT_ADDITION_DEFAULT = 20; // 暴击攻击力增加

const ROLE_LIST = [
    ['赵云', 200, 190, BLOOD_DEFAULT, PER_DEFAULT], // 1
    ['魏延', 186, 190, BLOOD_DEFAULT, PER_DEFAULT], // 2 - TODO
    ['黄忠', 196, 182, BLOOD_DEFAULT, PER_DEFAULT], // 3
    ['典韦', 199, 182, BLOOD_DEFAULT, PER_DEFAULT], // 4
    ['甘宁', 198, 180, BLOOD_DEFAULT, PER_DEFAULT], // 5
    ['关平', 166, 159, BLOOD_DEFAULT, PER_DEFAULT], // 6

    ['吕布', 200, 200, BLOOD_DEFAULT, PER_DEFAULT], // 7
    ['许褚', 195, 187, BLOOD_DEFAULT, PER_DEFAULT], // 8
    ['夏侯惇', 193, 189, BLOOD_DEFAULT, PER_DEFAULT], // 9
    ['周瑜', 179, 161, BLOOD_DEFAULT, PER_DEFAULT], // 10
    ['马超', 199, 187, BLOOD_DEFAULT, PER_DEFAULT], // 11
    ['关羽', 197, 191, BLOOD_DEFAULT, PER_DEFAULT], // 12
    ['张飞', 196, 189, BLOOD_DEFAULT, PER_DEFAULT], // 13
    ['李典', 176, 144, BLOOD_DEFAULT, PER_DEFAULT], // 14
    ['关兴', 164, 156, BLOOD_DEFAULT, PER_DEFAULT], // 15
    ['张苞', 163, 157, BLOOD_DEFAULT, PER_DEFAULT], // 16
]

console.log('三国武将转V0.0.1[策划:Lucien]');
var team1 = [];
var TEAMIDS_1 = [11, 12, 0];
for(var i=0;i<TEAMIDS_1.length;i++) {
    var role = {
        name: ROLE_LIST[TEAMIDS_1[i]][0],
        att: ROLE_LIST[TEAMIDS_1[i]][1], // 攻击
        def: ROLE_LIST[TEAMIDS_1[i]][2], // 防御
        blood: ROLE_LIST[TEAMIDS_1[i]][3], // 血量
        per: ROLE_LIST[TEAMIDS_1[i]][4] // 暴击 
    }
    team1.push(role);
}
for(var i=0;i<team1.length;i++) {
    console.log('队伍1，武将'  + i + ':' + team1[i].name);
}

var TEAMIDS_2 = [3, 7, 8];
var team2 = [];
for(var i=0;i<TEAMIDS_2.length;i++) {
    var role = {
        name: ROLE_LIST[TEAMIDS_2[i]][0],
        att: ROLE_LIST[TEAMIDS_2[i]][1], // 攻击
        def: ROLE_LIST[TEAMIDS_2[i]][2], // 防御
        blood: ROLE_LIST[TEAMIDS_2[i]][3], // 血量
        per: ROLE_LIST[TEAMIDS_2[i]][4] // 暴击 
    }
    team2.push(role);
}
for(var i=0;i<team2.length;i++) {
    console.log('队伍2，武将'  + i + ':' + team2[i].name);
}

var role1;
var role2;





/**
 * TODO 1 : 取消武将选择，手动构建武将组
 * TODO 
 */

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question(`请选择角色1的ID[0~15]?`, id => {
    for (var i = 0; i < ROLE_LIST.length; i++) {
        if (id + '' === i + '') {
            role1 = {
                name: ROLE_LIST[i][0],
                att: ROLE_LIST[i][1], // 攻击
                def: ROLE_LIST[i][2], // 防御
                blood: ROLE_LIST[i][3], // 血量
                per: ROLE_LIST[i][4] // 暴击 
            }
            break;
        }

    }
    console.log(`您选则 ${role1.name}!`)
    readline.question(`请选择角色2的ID[0~1]?`, id => {
        for (var i = 0; i < ROLE_LIST.length; i++) {
            if (id + '' === i + '') {
                role2 = {
                    name: ROLE_LIST[i][0],
                    att: ROLE_LIST[i][1], // 攻击
                    def: ROLE_LIST[i][2], // 防御
                    blood: ROLE_LIST[i][3], // 血量
                    per: ROLE_LIST[i][4] // 暴击 
                }
                break;
            }

        }
        console.log(`您选则 ${role2.name}!`);
        console.log('=====战斗准备完毕=====');
        console.log('' + role1.name + '对战' + role2.name);
        readline.question(`开始战斗[点击回车开始，输入0取消]?`, answer => {
            if (answer !== '0') {
                doBattle(role1, role2, 1);
            } else {
                console.log('Bye bye....');
                readline.close()
            }


        });
    });


})


function doBattle(role1, role2, round) {
    console.log('==========第' + round + '开始==========');
    var whoIsFirst = getRandomInt(2);
    var firstRole;
    var secondRole;
    if (whoIsFirst === 1) {
        console.log(role1.name + '首先攻击');
        firstRole = role1;
        secondRole = role2;
    } else {
        console.log(role2.name + '首先攻击');
        firstRole = role2;
        secondRole = role1;
    }

    var someOneOver = false;

    var perNumber = getRandomInt(100);
    var double = perNumber <= firstRole.per ? true : false;
    var beKill = 0;
    var doubleStr = '';
    if (double) {
        var beKill = CRIT_DEFAULT * (firstRole.att + CRIT_ADDITION_DEFAULT - secondRole.def + 5);
        beKill = beKill > 0 ? beKill : 0;
        secondRole.blood = secondRole.blood - beKill;
        doubleStr = '[暴击' + CRIT_DEFAULT + '倍,攻击力增加' + CRIT_ADDITION_DEFAULT + ']';
    } else {
        var beKill = (firstRole.att - secondRole.def + 5);
        beKill = beKill > 0 ? beKill : 0;
        secondRole.blood = secondRole.blood - beKill;
    }
    console.log(doubleStr + '第' + round + '轮，' + firstRole.name + '攻击.本次攻击伤害：' + beKill + '。'
        + secondRole.name + '剩余血量:' + secondRole.blood);
    if (secondRole.blood <= 0) {
        someOneOver = true;
        console.log('战斗结束，' + firstRole.name + '胜利！！');
    }

    if (!someOneOver) { // 第二个角色攻击
        var perNumber = getRandomInt(100);
        var double = perNumber <= secondRole.per ? true : false;
        var beKill = 0;
        var doubleStr = '';
        if (double) {
            var beKill = CRIT_DEFAULT * (secondRole.att + CRIT_ADDITION_DEFAULT - firstRole.def + 5);
            beKill = beKill > 0 ? beKill : 0;
            firstRole.blood = firstRole.blood - beKill;
            doubleStr = '[暴击' + CRIT_DEFAULT + '倍,攻击力增加' + CRIT_ADDITION_DEFAULT + ']';
        } else {
            var beKill = (secondRole.att - firstRole.def + 5);
            beKill = beKill > 0 ? beKill : 0;
            firstRole.blood = firstRole.blood - beKill;
        }
        console.log(doubleStr + '第' + round + '轮，' + secondRole.name + '攻击.本次攻击伤害：' + beKill + '。'
            + firstRole.name + '剩余血量:' + firstRole.blood);
        if (firstRole.blood <= 0) {
            someOneOver = true;
            console.log('=====战斗结束，' + secondRole.name + '胜利！！=====');
        }

    }

    if (someOneOver) {
        readline.close();
    } else {

        readline.question(`=====第${round}战斗结束，不分胜负。[点击回车继续，输入0取消]?=====`, answer => {
            if (answer !== '0') {
                round++;
                doBattle(role1, role2, round);
            } else {
                console.log('Bye bye....');
                readline.close()
            }


        });
    }


}
