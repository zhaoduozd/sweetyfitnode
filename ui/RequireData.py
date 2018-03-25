import json;

rootFoodPath = '/Users/duozhao/Documents/GitHub/sweetyfitnode/ui/foodsets/';
rootActionPath = '/Users/duozhao/Documents/GitHub/sweetyfitnode/ui/actionsets/';

def requireActions():
    result = [];
    regions = ['all', 'arm', 'back', 'chest', 'hip', 'leg', 'neck', 'shoulder', 'ventral'];

    for region in regions:
        action = {};
        action['actions'] = json.loads(readFile(rootActionPath + region + 'File'));
        action['regionname'] = region;
        result.append(action);

    result = json.dumps(result);
    return result;

def requireFoods():
    result = [];
    types = ['mainfood', 'vegetable', 'fruit', 'meatfish', 'fat', 'drink', 'egg'];

    for item in types:
        food = {};
        food['foods'] = json.loads(readFile(rootFoodPath + item + 'File'));
        food['typename'] = item;
        result.append(food);

    result = json.dumps(result);
    return result;



def readFile(path):
    f = open(path, 'r');
    result = f.readlines()[0];
    f.close();

    return result;