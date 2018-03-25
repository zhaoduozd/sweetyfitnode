import json

currentPath = '/Users/duozhao/Documents/GitHub/sweetyfitnode/ui/';

def getkey(a):
    return a['gifname'];

def SolveActionData():
    global currentPath;
    path = currentPath + 'actions.csv';

    f = open(path, 'r');
    rawdata = f.readlines();
    f.close();

    attributes = rawdata[0].split(',');
    rawdata.pop(0);

    neckList = [];
    shoulderList = [];
    armList = [];
    backList = [];
    chestList = [];
    ventralList = [];
    hipList = [];
    legList = [];
    allList = [];

    attrilen = len(attributes);

    for item in rawdata:
        rawaction = item.split(',');
        action = {};

        for attri in range(0, 14):
            action[attributes[attri]] = rawaction[attri];

        if action['region'] == 'neck':
            neckList.append(action);
        elif action['region'] == 'shoulder':
            shoulderList.append(action);
        elif action['region'] == 'arm':
            armList.append(action);
        elif action['region'] == 'back':
            backList.append(action);
        elif action['region'] == 'chest':
            chestList.append(action);
        elif action['region'] == 'ventral':
            ventralList.append(action);
        elif action['region'] == 'hip':
            hipList.append(action);
        elif action['region'] == 'leg':
            legList.append(action);
        elif action['region'] == 'all':
            allList.append(action);

    neckList.sort(key = getkey);
    shoulderList.sort(key = getkey);
    armList.sort(key = getkey);
    chestList.sort(key = getkey);
    ventralList.sort(key = getkey);
    hipList.sort(key = getkey);
    legList.sort(key = getkey);
    backList.sort(key = getkey);
    allList.sort(key = getkey);

    neckList = filterList(neckList);
    shoulderList = filterList(shoulderList);
    armList = filterList(armList);
    chestList = filterList(chestList);
    ventralList = filterList(ventralList);
    hipList = filterList(hipList);
    legList = filterList(legList);
    backList = filterList(backList);
    allList = filterList(allList);

    neckFileContent = json.dumps(neckList);
    shoulderFileContent = json.dumps(shoulderList);
    armFileContent = json.dumps(armList);
    backFileContent = json.dumps(backList);
    chestFileContent = json.dumps(chestList);
    ventralFileContent = json.dumps(ventralList);
    hipFileContent = json.dumps(hipList);
    legFileContent = json.dumps(legList);
    allFileContent = json.dumps(allList);

    writeFiles(neckFileContent, 'actionsets/neckFile');
    writeFiles(shoulderFileContent, 'actionsets/shoulderFile');
    writeFiles(armFileContent, 'actionsets/armFile');
    writeFiles(backFileContent, 'actionsets/backFile');
    writeFiles(chestFileContent, 'actionsets/chestFile');
    writeFiles(ventralFileContent, 'actionsets/ventralFile');
    writeFiles(hipFileContent, 'actionsets/hipFile');
    writeFiles(legFileContent, 'actionsets/legFile');
    writeFiles(allFileContent, 'actionsets/allFile');

    return;


def filterList(alist):
    result = [];

    for item in alist:
        if len(result) == 0:
            result.append(item);
        else:
            if item['gifname'] != result[len(result)-1]['gifname']:
                result.append(item);

    return result;


def SolveFoodData():
    global currentPath;
    path = currentPath + 'foods.csv';

    f = open(path, 'r');
    rawdata = f.readlines();
    f.close();

    attributes = rawdata[0].split(',');
    rawdata.pop(0);
    
    foodList = [];
    mainfoodList = [];
    vegetableList = [];
    meatfishList = [];
    eggList = [];
    fruitList = [];
    fatList = [];
    drinkList = [];

    attrilen = len(attributes);

    for item in rawdata:
        food = {};
        rawfood = item.split(',');
        for attri in range(attrilen-1):
            food[attributes[attri]] = rawfood[attri];
        
        if food['type'] == 'mainfood':
            mainfoodList.append(food);
        elif food['type'] == 'fruit':
            fruitList.append(food);
        elif food['type'] == 'vegetable':
            vegetableList.append(food);
        elif food['type'] == 'meat&fish':
            meatfishList.append(food);
        elif food['type'] == 'egg':
            eggList.append(food);
        elif food['type'] == 'drink':
            drinkList.append(food);
        elif food['type'] == 'fat':
            fatList.append(food);
    
    mainfoodFileContent = json.dumps(mainfoodList);
    vegetableFileContent = json.dumps(vegetableList);
    fruitFileContent = json.dumps(fruitList);
    meatfishFileContent = json.dumps(meatfishList);
    eggFileContent = json.dumps(eggList);
    fatFileContent = json.dumps(fatList);
    drinkFileContent = json.dumps(drinkList);

    writeFiles(mainfoodFileContent, 'foodsets/mainfoodfile');
    writeFiles(vegetableFileContent, 'foodsets/vegetablefile');
    writeFiles(fruitFileContent, 'foodsets/fruitfile');
    writeFiles(meatfishFileContent, 'foodsets/meatfishfile');
    writeFiles(eggFileContent, 'foodsets/eggfile');
    writeFiles(fatFileContent, 'foodsets/fatfile');
    writeFiles(drinkFileContent, 'foodsets/drinkfile');

    return;


def writeFiles(content, path):
    f = open(path, 'w');
    f.write(content);
    f.close();



SolveActionData();
#SolveFoodData();