import React, { useState } from 'react';
import { useIntl, Link, history, FormattedMessage, SelectLang } from 'umi';
import Footer from '@/components/Footer';
import { LockTwoTone, UserOutlined } from '@ant-design/icons';
// import logo from '@/assets/logo.svg';
import { Alert, message, Tabs } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { LoginParamsType } from '@/services/ant-design-pro/login';
import { fakeAccountLogin } from '@/services/ant-design-pro/login';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
// 获取当前页面网址
const Url = window.location.href;
let splitUrl = Url.split(':')[1];
localStorage.setItem('ip',splitUrl.split('//')[1])
/** 此方法会跳转到 redirect 参数所在的位置 */

const goto = () => {
  const { query } = history.location;
  const { redirect } = query as { redirect: string };
  window.location.href = redirect || '/';
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const [type, setType] = useState<string>('account');
  const intl = useIntl();

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    // console.log('123');
    try {
      // 登录
      const data = await fakeAccountLogin({ ...values });
      //  return
      if (data.status === 'ok') {
        //  console.log("123")
        localStorage.setItem('token', data.token);
        message.success('登录成功！');
        goto();
        return;
      }

      // 如果失败去设置用户错误信息
      setUserLoginState(data);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };
  const { status } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/ant/cp7logo137.png" />
              <span className={styles.title}>COOLPY7</span>
            </Link>
          </div>
          <div className={styles.desc}>COOLPY7开箱即用的物联网平台!</div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{}}
            submitter={{
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                })}
              />
            </Tabs>

            {status === 'error' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'page.login.accountLogin.errorMessage',
                  defaultMessage: '账号或密码错误',
                })}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="userName"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: '用户名: admin',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockTwoTone className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: '密码: coolpy7',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
