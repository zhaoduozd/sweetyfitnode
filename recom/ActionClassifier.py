import ExerciseAttributeTree as eatree
import json


order = ['region', 'place', 'level'];
setno = 0;


def classifier():
    tree = eatree.getTree();

    f = open('actions.csv', 'r');
    rawdata = f.readlines();
    attributes = rawdata[0].split(',');
    rawdata.pop(0);

    actions = [];

    for item in rawdata:
        action ={};
        act = item.split(',');
        action['id'] = act[0];
        action['name'] = act[1];
        action['region'] = act[2];
        action['level'] = act[3];
        action['effect'] = act[4];
        action['group'] = act[5];
        action['calorie'] = act[6];
        action['pair'] = act[7];
        action['place'] = act[8].split('.');
        action['time'] = act[9];
        action['grouptime'] = act[10];
        action['instrument'] = act[11];
        action['tip'] = act[12];
        action['gifname'] = act[13];
        actions.append(action);
 
    for action in actions:
        putActionIntoSets(action, tree['region'], 0, '');


def putActionIntoSets(action, tree, root, name):
    if tree == None:
        fname = 'exercisesets/%s' % name;
        # content = '%s,%s,%s,%s,%s,%s,%s\n' % (action['id'],action['name'],action['pair'],action['effect'],action['calorie'],action['group'],action['time']);
        content = json.dumps(action) + '\n';
        f = open(fname, 'a');
        f.write(content);
        f.close();
        return;

    tag = order[root];

    if isinstance(action[tag], list):
        for item in action[tag]:
            putActionIntoSets(action, tree[item], root+1, name+item);
    else:
        putActionIntoSets(action, tree[action[tag]], root+1, name + action[tag]);


classifier();

















