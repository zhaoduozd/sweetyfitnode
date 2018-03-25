# -*- coding: UTF-8 -*-
import random

def ActionCombination(actionset, user):
    ## Initial Action Lists
    actionList = [];
    warmupList = [];
    strongmuscleList = [];
    losefatList = [];
    stretchList = [];

    for action in actionset:
        if action['effect'] == 'warmup':
            warmupList.append(action);
        elif action['effect'] == 'strongmuscle':
            strongmuscleList.append(action);
        elif action['effect'] == 'losefat':
            losefatList.append(action);
        elif action['effect'] == 'streching':
            stretchList.append(action);


    # Calculate Time of Each Type Action
    time = int(user['time']) * 60;
    warmupTime = 0;
    strongmuscleTime = 0;
    losefatTime = 0;
    stretchTime = 0;

    for action in warmupList:
        print 'action grouptime:', action['grouptime'];
        warmupTime += float(action['grouptime']);
    for action in losefatList:
        print 'action grouptime:', action['grouptime'];
        losefatTime += float(action['grouptime']);
    for action in stretchList:
        print 'action grouptime:', action['grouptime'];
        stretchTime += float(action['grouptime']);

    strongmuscleTime = time - warmupTime - losefatTime - stretchTime;

    # Generate Action List for Recommendation
    actionList.extend(warmupList);
    actionList.extend(SelectActions(strongmuscleList, strongmuscleTime));
    actionList.extend(losefatList);
    actionList.extend(stretchList);

    print 'actionList lenth', len(actionList);

    return actionList;



#*# Select Actions from Action List
def SelectActions(actionlist,smuscletime):
    result = [];

    strongmuscleTotalTime = 0;
    for action in actionlist:
        strongmuscleTotalTime += float(action['grouptime']);

    if strongmuscleTotalTime < smuscletime:
        result = actionlist;
        return result;

    return result;











