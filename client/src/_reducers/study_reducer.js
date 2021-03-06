// 액션 결과를 나타내는 타입값 선언
import {
    READ_STUDY
} from '../_actions/types';

function study_split_action(state = {}, action) {
    switch (action.type) {
        case READ_STUDY:

            return { ...state, result: action.payload };

        default:
            // 함께 들어오는 state값 리턴
            return state;
    }
}

export default study_split_action;