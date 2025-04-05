import {
    ExclamationCircleOutlined,
    FrownTwoTone,
    MehTwoTone,
    SmileTwoTone
} from "@ant-design/icons";
import { notification } from "antd";
import React from "react";

type NotificationType = "success" | "info" | "warning" | "error";

const getIconByType = (type: NotificationType): React.ReactNode => {
    const iconMap = {
        success: <SmileTwoTone twoToneColor="#52c41a" />,
        info: <MehTwoTone twoToneColor="#1890ff" />,
        warning: <ExclamationCircleOutlined twoToneColor="#faad14" />,
        error: <FrownTwoTone twoToneColor="#ff4d4f" />,
    };
    return iconMap[type];
};

const showNotification = (
    type: NotificationType,
    title: string,
    des: string,
    callback?: () => void
) => {
    notification[type]({
        message: title,
        description: des,
        onClick: () => callback?.(),
        icon: getIconByType(type),
        duration: 3,
        showProgress: true,
        pauseOnHover: true,
        className: `custom-notification custom-notification-${type}`
    });
};


const Notification = {
    success: (title: string, des: string, callback?: () => void) =>
        showNotification("success", title, des, callback),
    info: (title: string, des: string, callback?: () => void) =>
        showNotification("info", title, des, callback),
    warning: (title: string, des: string, callback?: () => void) =>
        showNotification("warning", title, des, callback),
    error: (title: string, des: string, callback?: () => void) =>
        showNotification("error", title, des, callback),
};

export default Notification;
