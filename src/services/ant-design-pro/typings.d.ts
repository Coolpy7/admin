// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    // status: String,
    //currentAuthority: String,
    //type: null,
    data: {
      name?: string;
      avatar?: string;
      userid?: string;
    };
    // email?: string;
    // signature?: string;
    // title?: string;
    // group?: string;
    //tags?: { key?: string; label?: string }[];
    //notifyCount?: number;
    //unreadCount?: number;
    //country?: string;
    //access?: string;
    //geographic?: {
    //province?: { label?: string; key?: string };
    //city?: { label?: string; key?: string };
    //};
    //address?: string;
    //phone?: string;
  };

  export interface CurrentUser {
    data: {
      name?: string;
      avatar?: string;
      userid?: string;
    };
    // avatar?: string;
    //  name?: string;
    //  title?: string;
    // group?: string;
    // signature?: string;
    //  tags?: {
    //    key: string;
    // label: string;
    //  }[];
    //  userid?: string;
    // access?: 'user' | 'guest' | 'admin';
    // unreadCount?: number;
  }

  export interface LoginStateType {
    currentAuthority?: string;
    status?: 'ok' | 'error';
    currentAuthority: string;
    token: string;
    type: null;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userName?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
