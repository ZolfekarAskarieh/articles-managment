import {
    ADD_ARTICLE,
    DELETE_ARTICLE,
    EDIT_ARTICLE
} from './types';
import { NotificationManager } from 'react-notifications';

import {addArticle, editArticle, deleteArticle} from '../services/articles';

export function addArticleAction(article) {
    const res = addArticle(article);
    if(res.success) {
        NotificationManager.success('Article Created Successfully!');
    }
    return {type: ADD_ARTICLE, payload: res}
}

export function deleteArticleAction(article) {
    const res = deleteArticle(article);
    if(res.success) {
        NotificationManager.success('Article Deleted Successfully!');
        return {type: DELETE_ARTICLE, payload: res}
    } else {
        NotificationManager.error('Article is not found!');
    }
}

export function editArticleAction(article) {
    const res = editArticle(article);
    if(res.success) {
        NotificationManager.success('Article Edited Successfully!');
    } else {
        NotificationManager.error('Article is not found!');
    }
    return {type: EDIT_ARTICLE, payload: res}
}

