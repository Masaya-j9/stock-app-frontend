import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { ErrorType, ErrorMessageProps } from '@/types/errors';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ type = 'unknown', message }) => {
  const defaultMessages: Record<ErrorType, string> = {
    network: 'ネットワーク接続に失敗しました。',
    validation: '入力内容に誤りがあります。',
    conflict: '既に存在するデータがあります。',
    auth: '認証に失敗しました。ログインしてください。',
    unknown: '予期しないエラーが発生しました。',
    notFoundItem: 'アイテムが見つかりません。',
    create: 'アイテムの登録に失敗しました。',
    update: 'アイテムの更新に失敗しました。',
    delete: 'アイテムの削除に失敗しました。',
  };

  return (
    <Alert severity="error">
      <AlertTitle>エラーが発生しました</AlertTitle>
      {message || defaultMessages[type]}
    </Alert>
  );
};