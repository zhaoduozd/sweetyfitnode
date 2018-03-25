import json

currentPath = '/Users/duozhao/Documents/GitHub/sweetyfitnode/recom/';

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

SolveFoodData();