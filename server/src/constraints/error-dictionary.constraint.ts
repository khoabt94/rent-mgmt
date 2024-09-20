export enum ERRORS_DICTIONARY {
  // AUTH
  EMAIL_EXISTED = 'Email đã tồn tại!',
  WRONG_CREDENTIALS = 'Thông tin đăng nhập không chính xác',
  UNAUTHORIZED = 'Không có quyền truy cập',

  // INFO
  INFO_NOT_FOUND = 'Không tìm thấy thông tin',

  NOT_OWNER_OF_RENTEE = 'Bạn không có quyền chỉnh sửa người thuê này',
  NOT_OWNER_OF_AREA = 'Bạn không có quyền chỉnh sửa khu nhà này',
  SAME_MONTH_COLLECTION_EXISTED = 'Đã tạo kỳ thu tiền cho tháng hiện tại',

  UNSUITABLE_END_ELECTRICITY = 'Số điện cuối kỳ không phù hợp',
  UNSUITABLE_END_WATER = 'Số nước cuối kỳ không phù hợp',
}