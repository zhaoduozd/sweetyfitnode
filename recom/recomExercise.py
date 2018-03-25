import FindActionSet as faset
import ActionCombination as acset
import json

def queryRecomActions(user):
    actionset = faset.FindExerciseSet(user);
    actionlist = acset.ActionCombination(actionset, user);

    #print isinstance(actionlist, list);
    return json.dumps(actionlist);

#queryRecomActions({'uid':'001','level':'SS','region':'back','calorie':'100','place':'home','goal':'losefat','time':'10'});