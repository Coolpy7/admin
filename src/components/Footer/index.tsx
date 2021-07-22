import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();

  intl.formatMessage({
    id: 'app.copyright.produced',
  });

  return (
    <DefaultFooter
      copyright="2021 COOLPY.NET出品"
      links={[
        {
          key: 'CP7 Admin',
          title: 'COOLPY7',
          href: 'http://coolpy.net/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Coolpy7',
          blankTarget: true,
        },
      ]}
    />
  );
};
