export type ModalWithCreatedAt = {
  createdAt: Date;
} & {
  [P in Exclude<PropertyKey, 'createdAt'>]: PropertyKey;
};

export type TimeZone = "CN" | "USA";

// 国际化日期格式化
export function formatDateTime(body: ModalWithCreatedAt, TimeZone: TimeZone) {
  return {
    ...body,
    createdAt: body.createdAt?.toLocaleString(TimeZone == "CN" ? "zh-CN" : "en-US"
      , { timeZone: TimeZone == "CN" ? "Asia/Shanghai" : "America/New_York" })
  };
}