import commonModules from '../../../common/modules';
import defaultRouter from './defaultRouter';
import i18n from './i18n';
import counter from './counter';
import post from './post';
import upload from './upload';
import user from './user';
import payments from './payments';
import contact from './contact';
import pageNotFound from './pageNotFound';
import pagination from './pagination';
import chat from './chat';
import './favicon';
import './pwa';

import ClientModule from './ClientModule';

export default new ClientModule(
  commonModules,
  defaultRouter,
  counter,
  post,
  upload,
  contact,
  pagination,
  chat,
  payments,
  user,
  i18n,
  pageNotFound
);
