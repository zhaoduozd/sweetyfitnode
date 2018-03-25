import json
import random

rootFoodPath = '/Users/duozhao/Documents/GitHub/sweetyfitnode/recom/foodsets/';


def requireFoods():
    result = [];
    mainfood = [];
    vegetable = [];
    fruit = [];
    meatfish = [];
    fat = [];
    drink = [];
    egg = [];
    types = ['mainfood', 'vegetable', 'fruit', 'meatfish', 'fat', 'drink'];

    for item in types:
        subtype = json.loads(readFile(rootFoodPath + item + 'File'));
        food = {};
        food['foods'] = SelectFoods(subtype);
        food['typename'] = item;
        result.append(food);

    result = json.dumps(result);
    return result;



def readFile(path):
    f = open(path, 'r');
    result = f.readlines()[0];
    f.close();

    return result;

def SelectFoods(foods):
    flen = len(foods);
    result = [];
    startx = random.randint(0, flen-1);
    result.append(foods[startx]);
    result.append(foods[(startx + 2)%flen]);
    result.append(foods[(startx + 4)%flen]);

    return result;




requireFoods();















