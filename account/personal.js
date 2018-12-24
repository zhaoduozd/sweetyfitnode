var MongoClient = require('mongodb').MongoClient
       , assert = require('assert');

var url = 'mongodb://localhost:27017/sweetyfitnode';

var exercise_type = ['高度有氧运动','低强度有氧运动', '力量训练','肌肉拉伸','身体塑形','其他'];

var food_type = [];

var exercise_strategies = {
    superthin:{
        'Advice':'您目前的体脂率处于%12以下，属于超级偏瘦，体内脂肪含量过低。由于脂肪除了供给能量之外，对人体还有很多重要的作用，如调节身体机能，促进维生素的吸收，提供必要的脂肪酸等。因此，Sweety建议您日常增加低强度的规律有氧运动，强壮您的心肺功能。适当做一些力量训练，舒展运动。配合Sweety为您提供的饮食建议，提高您的体脂率到适当范围。\n祝您运动愉快！',
        'Data':['0', '0.3', '0.1', '0.2', '0.3', '0.1']
    },
    thin:{
        'Advice':'您目前的体脂率偏低，脂肪对于身体有着非常重要的作用，因此您够瘦了，请不要再继续瘦下去了呢！Sweety建议您，增加力量训练，身体塑形以及拉伸运动。力量训练可以撕裂肌肉，让肌肉更新生长，更加紧致，告别拜拜肉，从力量训练开始！身体塑形有助于美化您的体形，挺直了腰背，拉直的长腿，不想变美都不行！拉伸运动必不可少，完成了力量训练后，充分的拉伸可以拉长肌肉，让线条修长！光是瘦，还不足够美！当您看到自己漂亮的肌肉线条，一定会更加爱自己！！！',
        'Data':['0.05', '0.1', '0.3', '0.3', '0.2', '0.05']
    },
    stardard:{
        'Advice':'哇塞！您的体脂率简直不能再标准啦！Sweety建议规律运动，均衡有氧训练和力量训练。有氧训练可以增强您的心肺功能，力量训练有助于您保持标准的体脂率，训练后的拉伸可以拉长您的肌肉线条，让身材看起来更修长！加油！！！',
        'Data':['0.1', '0.2','0.3', '0.2', '0.15', '0.05']
    },
    fat:{
        'Advice':'是的！如果您再多运动一些，体脂率下降一点，那您的身材真的会好棒棒的！Sweety建议您，适当增加有氧训练，逐渐提升有氧训练的强度，这样可以帮助您减掉多余的脂肪。同时，增加力量训练以增加肌肉比率，同体积的肌肉会比脂肪多消耗三倍的热量哦！运动过后，要记得充分拉伸哦，拉长的肌肉线条会让身体看起来更修长呢！加油！您是最棒的呢！',
        'Data':['0.2', '0.3', '0.2', '0.2', '0.09', '0.01'];
    },
    superfat:{
        'Advice':'亲爱的，通过对您的体脂率的计算，您有超出正范围很高的脂肪含量！没错，脂肪可以提供能量，也是人体重要的组成成分，但是过多的脂肪也会导致疾病！Sweety建议您，增加低强度的有氧训练，如快走，适当登山，这样的运动可以帮助您安全地减脂；避免高强度的有氧训练，如快跑等，这样可以避免您重要的关节收到伤害；适当做一些力量训练，不过要注意安全，由于您的体重较重，在训练中要注意关节等部位的保护，如果不适，应立即停止运动！加油！坚持就是胜利，您是最棒哒！',
        'Data':['0', '0.5', '0.1', '0.2', '0.1', '0.1']
    }
};

var diet_type = ['碳水化物类','蛋白质类','维生素类','脂肪类','纤维素类'];

var diet_strategies = {
    superthin:{
        'Advice':'哇哦！亲爱的，您真的太苗条了呢！不过脂肪过低，会影响身体的健康，Sweety建议您适当增加脂肪类食物的摄入，同时增加维生素和蛋白质的补充！坚果中含有富含优质脂肪，下午茶的时候可以吃一些补充脂肪摄入哦！',
        'Data':['0.3', '0.3', '0.2', '0.2', '0.2'];
    },
    thin:{
        'Advice':'您身材真的很苗条，只是稍稍偏瘦。Sweety建议您可以适当',
        'Data':[]
    },
    stardard:{
        'Advice':'',
        'Data':[]
    },
    fat:{
        'Advice':'',
        'Data':[]
    },
    superfat:{
        'Advice':'',
        'Data':[]
    }
};



function personal (req, res) {
    var uid = req.query.u;

    MongoClient.connect(url, function(err, client) {

        assert.equal(null, err);
        console.log("Personal Connected correctly to server");

        const db = client.db("accounts");
        const usersinfo = db.collection("usersInfo");

        usersinfo.find({'uid':uid}).toArray(function(err, docs) {
            assert.equal(err, null);  
  
            if (docs.length == 0) {
                res.json({'status':'uid or pwd is wrong!'});
            } else {
                var user = docs[0];
                result = [];
                personalinfo = {};

                var fadvice0 = '由于您的体脂率偏高，SweetyFit建议您减少脂肪的摄入，同时增加蛋白质和蔬菜的用量。可以食用少量的坚果，在适当的时候补充能量';
                var fadvice1 = '由于您的体脂率偏低，SweetyFit建议您平衡脂肪的摄入，同时增加蛋白质和蔬菜的用量。可以食用少量的坚果，在适当的时候补充能量';
                var fadvice2 = '您的体脂率属于标准，SweetyFit建议您平衡各类食物的摄入，同时增加蛋白质和蔬菜的用量。可以食用少量的坚果，在适当的时候补充能量';

                var weight = user['weight'] - 0;
                var height = user['height'] - 0;
                var age = 2018 - (user['birthday'].slice(0,4) - 0);
                var gender = user['gender'] - 0;

                var BMI = weight / (height*height);
                var fatratio = BMI * 1.2 + 0.23 * age - 5.4 - 10.8 * gender;

                var eadvice = eadvice2;
                var fadvice = fadvice2;
                var edata = edata2;
                var fdata = fdata2;

                if (fatratio < 0.21) {
                    eadvice = eadvice1;
                    fadvice = fadvice1;
                    edata = edata1;
                    fdata = fdata1;
                } else if (fatratio > 0.34) {
                    eadvice = eadvice0;
                    fadvice = fadvice0;
                    edata = edata0;
                    fdata = fdata0;
                }

                exerciseAdvice = {
                    'Advice': eadvice,
                    'Data':[
                        {
                            'Type':exercise_type,
                            'Data':edata
                        }
                    ]
                };
                dietAdvice = {
                    'Advice':fadvice,
                    'Data':[
                        {
                            'Type': diet_type,
                            'Data':fdata
                        }
                    ]
                }
                personalinfo['history'] = user['history'];
                personalinfo['level'] = user['level'];
                personalinfo['exerciseAdvice'] = exerciseAdvice;
                personalinfo['dietAdvice'] = dietAdvice;
                if (personalinfo['history'].length <= 0) {
                    var currenttime = new Date();
                    var curyear = currenttime.getFullYear()+'';
                    var curMonth = currenttime.getMonth()+1;
                    var curDate = currenttime.getDate();

                    if (curMonth < 10) {
                        curMonth = '0' + curMonth;
                    }

                    if (curDate < 10) {
                        curDate = '0' + curDate;
                    }

                    var today = curyear + curMonth + curDate;
                    personalinfo['history'] = [{'Calorie':0, 'Date':today}];
                }
                res.json(personalinfo);
            }
        });
    });
}



exports.personal = personal;
