function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const BLOOD_DEFAULT = 100; // 默认血量-Lucien希望设置为400，调试阶段设置为100
const PER_DEFAULT = 20; // 默认暴击率
const CRIT_DEFAULT = 2; // 暴击翻倍
const CRIT_ADDITION_DEFAULT = 20; // 暴击攻击力增加

const ROLE_LIST = [
    ['赵云', 200, 190, BLOOD_DEFAULT, PER_DEFAULT], // 0
    ['魏延', 186, 190, BLOOD_DEFAULT, PER_DEFAULT], // 1 
    ['黄忠', 196, 182, BLOOD_DEFAULT, PER_DEFAULT], // 2
    ['典韦', 199, 182, BLOOD_DEFAULT, PER_DEFAULT], // 3
    ['甘宁', 198, 180, BLOOD_DEFAULT, PER_DEFAULT], // 4
    ['关平', 166, 159, BLOOD_DEFAULT, PER_DEFAULT], // 5

    ['吕布', 200, 200, BLOOD_DEFAULT, PER_DEFAULT], // 6
    ['许褚', 195, 187, BLOOD_DEFAULT, PER_DEFAULT], // 7
    ['夏侯惇', 193, 189, BLOOD_DEFAULT, PER_DEFAULT], // 8
    ['周瑜', 179, 161, BLOOD_DEFAULT, PER_DEFAULT], // 9
    ['马超', 199, 187, BLOOD_DEFAULT, PER_DEFAULT], // 10
    ['关羽', 197, 191, BLOOD_DEFAULT, PER_DEFAULT], // 11
    ['张飞', 196, 189, BLOOD_DEFAULT, PER_DEFAULT], // 12
    ['李典', 176, 144, BLOOD_DEFAULT, PER_DEFAULT], // 13
    ['关兴', 164, 156, BLOOD_DEFAULT, PER_DEFAULT], // 14
    ['张苞', 163, 157, BLOOD_DEFAULT, PER_DEFAULT], // 15
    ['山贼', 80, 110, BLOOD_DEFAULT, PER_DEFAULT], // 16
    ['张宝', 188, 148, BLOOD_DEFAULT*3, PER_DEFAULT], // 17
    ['张角', 194, 168, BLOOD_DEFAULT*5, PER_DEFAULT], // 18
]

const LEVEL_LIST = [
    {
        name: '黄巾之乱',
        action: [
            {
                per: 100,
                title: '山贼出现',
                roleList: [
                    { id: 16 },
                    { id: 16 },
                    { id: 16 }
                ]
            }, {
                per: 100,
                title: '张宝出现',
                roleList: [
                    { id: 16 },
                    { id: 16 },
                    { id: 16 },
                    { id: 17 }
                ]
            }, {
                per: 100,
                title: '张角出现',
                roleList: [
                    { id: 16 },
                    { id: 16 },
                    { id: 16 },
                    { id: 17 },
                    { id: 18 }
                    
                ]
            }
        ]
    }
]

console.log('三国武将转V0.0.1[游戏策划:Lucien]');
var team1 = [];
var TEAMIDS_1 = [11, 12, 0];
for (var i = 0; i < TEAMIDS_1.length; i++) {
    var role = {
        teamId: 'A',
        name: ROLE_LIST[TEAMIDS_1[i]][0],
        att: ROLE_LIST[TEAMIDS_1[i]][1], // 攻击
        def: ROLE_LIST[TEAMIDS_1[i]][2], // 防御
        blood: ROLE_LIST[TEAMIDS_1[i]][3], // 血量
        per: ROLE_LIST[TEAMIDS_1[i]][4] // 暴击 
    }
    team1.push(role);
}
for (var i = 1; i <= team1.length; i++) {
    console.log('队伍出场，武将顺序[' + i + ']:' + team1[i - 1].name);
}


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log('=====战斗准备完毕=====');

var level = LEVEL_LIST[0];
level.pos = 0; // 初始化位置
console.log('=====欢迎来到第一关:' + level.name + '=====');

readline.question(`进入关卡，开始战斗[点击回车开始，输入0取消]?`, answer => {
    if (answer !== '0') {
        doAction(team1, level, 0);
    } else {
        console.log('Bye bye....');
        readline.close()
    }
})

function doAction(team, level) {
    var pos = level.pos + 1;
    console.log('*****=====第1关第' + pos + '个战斗:' + level.action[level.pos].title + '。=====*****');
    var team2 = [];
    for (var i = 0; i < level.action[level.pos].roleList.length; i++) {
        var roleId = level.action[level.pos].roleList[i].id;
        var role = {
            teamId: 'B',
            name: ROLE_LIST[roleId][0],
            att: ROLE_LIST[roleId][1], // 攻击
            def: ROLE_LIST[roleId][2], // 防御
            blood: ROLE_LIST[roleId][3], // 血量
            per: ROLE_LIST[roleId][4] // 暴击 
        }
        team2.push(role);
    }
    for (var i = 1; i <= team2.length; i++) {
        console.log('对方队伍出场，武将顺序[' + i + ']:' + team2[i - 1].name);
    }
    doBattle(team, team2, 1, 0, 0, level);

    
}

//  
function doBattle(team1, team2, round, t1Pos, t2Pos, level) {
    var role1 = team1[t1Pos];
    var role2 = team2[t2Pos];
    var winTeamId = 'NA';
    if (round === 1) {
        console.log(role1.name + 'VS' + role2.name);
    }
    console.log('==第' + round + '轮开始==');
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
        beKill = beKill >= 5 ? beKill : 5;
        secondRole.blood = secondRole.blood - beKill;
        doubleStr = '[暴击' + CRIT_DEFAULT + '倍,攻击力增加' + CRIT_ADDITION_DEFAULT + ']';
    } else {
        var beKill = (firstRole.att - secondRole.def + 5);
        beKill = beKill >= 5 ? beKill : 5;
        secondRole.blood = secondRole.blood - beKill;
    }
    console.log(doubleStr + '第' + round + '轮，' + firstRole.name + '攻击.本次攻击伤害：' + beKill + '。'
        + secondRole.name + '剩余血量:' + secondRole.blood);
    if (secondRole.blood <= 0) {
        someOneOver = true;
        winTeamId = firstRole.teamId;
        console.log('本次单挑结束，' + firstRole.name + '胜利！！');
    }

    if (!someOneOver) { // 第二个角色攻击
        var perNumber = getRandomInt(100);
        var double = perNumber <= secondRole.per ? true : false;
        var beKill = 0;
        var doubleStr = '';
        if (double) {
            var beKill = CRIT_DEFAULT * (secondRole.att + CRIT_ADDITION_DEFAULT - firstRole.def + 5);
            beKill = beKill >= 5 ? beKill : 5;
            firstRole.blood = firstRole.blood - beKill;
            doubleStr = '[暴击' + CRIT_DEFAULT + '倍,攻击力增加' + CRIT_ADDITION_DEFAULT + ']';
        } else {
            var beKill = (secondRole.att - firstRole.def + 5);
            beKill = beKill >= 5 ? beKill : 5;
            firstRole.blood = firstRole.blood - beKill;
        }
        console.log(doubleStr + '第' + round + '轮，' + secondRole.name + '攻击.本次攻击伤害：' + beKill + '。'
            + firstRole.name + '剩余血量:' + firstRole.blood);
        if (firstRole.blood <= 0) {
            someOneOver = true;
            winTeamId = secondRole.teamId;
            console.log('==本次战斗结束，' + secondRole.name + '胜利！！==');
        }

    }

    if (someOneOver) {
        // 进一步判断是否还有剩余人员，有的话启动剩余人员继续战斗
        if (winTeamId === 'A') { // team1胜利
            if (t2Pos < team2.length - 1) { // 不是最后一个战斗人员
                t2Pos++;
                doBattle(team1, team2, 1, t1Pos, t2Pos, level);
            } else {
                console.log('战斗结束，胜利!');
                level.winTag = 'A';
                dodo(team1, team2, 1, t1Pos, t2Pos, level)
            }
        } else if (winTeamId === 'B') { // team2胜利
            if (t1Pos < team1.length - 1) { // 不是最后一个战斗人员
                t1Pos++;
                doBattle(team1, team2, 1, t1Pos, t2Pos, level);
            } else {
                console.log('战斗结束，失败!');
                level.winTag = 'B';
                dodo(team1, team2, 1, t1Pos, t2Pos, level);
            }
        }

        // 判断战斗是否继续
        


    } else {

        readline.question(`==第${round}轮战斗结束，不分胜负。[点击回车继续，输入0取消]?==`, answer => {
            if (answer !== '0') {
                round++;
                doBattle(team1, team2, round, t1Pos, t2Pos, level);
            } else {
                console.log('Bye bye....');
            }


        });
    }


}

function dodo(team1, team2, round, t1Pos, t2Pos, level) {
    if (level.winTag === 'A') {
        var pos = level.pos + 1;
        if(pos < level.action.length) {
            readline.question(`=====第${pos}个战斗结束。。[点击回车继续，输入0取消]?=====`, answer => {
                if (answer !== '0') {
                    level.pos++;
                    doAction(team1, level)
                } else {
                    console.log('Bye bye....');
                }
    
    
            });
        }else {
            console.log('!!!!!!!!!!恭喜您！通关了!!!!!!!!!!');
            readline.close();
        }
        
    } else {
        console.log('打不过GG了....');
        readline.close();
    }
}
