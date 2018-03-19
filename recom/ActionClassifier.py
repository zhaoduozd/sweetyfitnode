import ExerciseAttributeTree as eatree


order = ['region', 'place', 'level'];
setno = 0;


def classifier():
    tree = eatree.getTree();

    f = open('actions.csv', 'r');
    rawdata = f.readlines();
    attributes = rawdata[0].split(',');
    rawdata.pop(0);

    actions = [];

    for action in rawdata:
        action = action.split(',');
        actions.append(action);

    for act in actions:
        action = {};
        action['id'] = act[0];
        action['name'] = act[1];
        action['calorie'] = act[3];
        action['level'] = act[4];
        action['pair'] = act[7];
        action['time'] = act[9];
        action['group'] = act[10][0:-1];
        action['region'] = act[2].split('.');
        action['place'] = act[5].split('.');
        action['instrument'] = act[6].split('.');
        action['effect'] = act[8];

        traverse(action, tree['region'], 0, '');


def traverse(action, tree, root, name):
    if tree == None:
        fname = 'exercisesets/%s' % name;
        content = '%s,%s,%s,%s,%s,%s,%s\n' % (action['id'],action['name'],action['pair'],action['effect'],action['calorie'],action['group'],action['time']);
        f = open(fname, 'a');
        f.write(content);
        f.close();
        return;

    tag = order[root];
    if action[tag][0] == 'S':
        traverse(action, tree[action[tag]], root+1, name + action[tag]);
    else:
        for item in action[tag]:
            traverse(action, tree[item], root+1, name+item);


classifier();

















