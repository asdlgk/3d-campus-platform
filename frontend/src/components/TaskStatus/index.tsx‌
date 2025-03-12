import React from 'react';
import { Table, Tag } from 'antd';
import useTaskStatus from '../../../hooks/useTaskStatus';
import ProgressBar from './ProgressBar';
import type { TaskItem } from '../../../types/types';

const TaskStatus: React.FC = () => {
  const { tasks } = useTaskStatus();

  const columns = [
    {
      title: '任务ID',
      dataIndex: 'taskId',
      key: 'taskId',
    },
    {
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: TaskItem['status']) => (
        <Tag color={status === 'completed' ? 'green' : 'processing'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => <ProgressBar progress={progress} />,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="taskId"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default TaskStatus;
