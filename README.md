# NYAN TOEIC V9.4 – Public Release Candidate

732 mục từ, 827 câu luyện hoạt động (12 Test), 24 đoạn đọc, 140 bài, 64 câu mèo không trùng giữa 30 mèo. Đưa toàn bộ nội dung ZIP lên repo riêng, index.html và .nojekyll ở gốc. Chưa triển khai. Mục tiêu nội dung dài hạn chưa hoàn thành.

# NYAN TOEIC V9.2 – Public Beta candidate

Website tĩnh tiếng Việt học TOEIC Part 5, độc lập, không liên kết ETS. Đưa toàn bộ nội dung ZIP này (index.html ở gốc) lên repository riêng, Settings → Pages → Deploy from a branch → main / (root). Chưa triển khai.

Tài khoản chỉ là hồ sơ cục bộ, không đồng bộ và không bảo đảm duy nhất toàn Internet. Người dùng chung trình duyệt biết tên có thể đặt lại mật khẩu. Không sử dụng mật khẩu quan trọng. Không có Admin mặc định, thu phí, AI hoặc thu thập phản hồi từ xa. Mã và đáp án có thể xem công khai. Góp ý tạo nội dung sao chép thủ công. TTS tùy thiết bị.

PWA: dùng HTTPS, chờ bộ nhớ đệm sẵn sàng, kiểm tra khi mất mạng; đóng toàn bộ tab trước khi dùng bản cập nhật. Xóa dữ liệu trình duyệt có thể mất tiến độ. Chưa xác nhận cài đặt và ngoại tuyến thực tế trong môi trường kiểm thử.

Nguồn: https://www.ets.org/toeic/test-takers/prepare.html · https://www.iibc-global.org/toeic/test/lr/about/format/sample05.html · https://dictionary.cambridge.org/grammar/british-grammar/ · https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference

V9.2: 14 mèo phần thưởng (5 Rare, 4 Super Rare, 3 Epic, 2 Ultra Rare), không trùng trước khi đủ bộ. Test nộp đủ và mốc học tập thưởng theo hồ sơ cục bộ. Không mất mèo, không mua bán. Độ hiếm chỉ là quy ước NYAN. Mèo đã mở có thể dùng avatar và triệu hồi, kể cả qua nút Gọi thêm mèo trên điện thoại. Android Chrome → menu ⋮ → Cài ứng dụng/Thêm vào màn hình chính; iOS Safari → Chia sẻ → Thêm vào màn hình chính. Cần thử trên HTTPS và thiết bị thật. Nguồn giống mèo: https://cfa.org/breeds/ ; https://cfa.org/breed/khao-manee/ ; https://cfa.org/breed/lykoi/ .

## V9.3 – Vocabulary Universe (đợt 1)
252 từ, 24 lĩnh vực hiển thị, 62 nhóm họ từ, học từng từ, 8 kiểu luyện, 6 đoạn đọc, sổ tay và bản đồ tiến độ. Mục tiêu 3.000 từ chưa hoàn thành. Mức độ do NYAN ước lượng, nội dung tự biên soạn, chưa có kiểm định độc lập. IPA Mỹ gần đúng từ CMUdict (dấu sắc/huyền trên nguyên âm thể hiện trọng âm); giấy phép ./assets/CMUDICT-LICENSE.txt. PWA và phát âm cần kiểm tra trên thiết bị thật. Giữ nguyên 767 câu luyện và 140 bài. Chưa triển khai trực tuyến.


## V9.4 – Part 5 Release Candidate
- 732 mục từ (480 mới), 24 lĩnh vực, 100 họ từ, 1.464 cụm theo mục; 827 câu luyện hoạt động, 12 Test, 24 đoạn đọc, 140 bài. 64 câu động viên song ngữ; 30 mèo có câu riêng không trùng khi tương tác. Giữ nội dung V9.3 và phần thưởng cũ.
- Chạy thử cổng 8086. Xem `START_V9_4.md` và `QA_V9_4.md`. Bản công khai riêng, chưa phát hành.
- Các mục tiêu dài hạn 3.000 từ, 2.000–3.000 câu, 20–30 Test, 100+ đoạn đọc chưa đạt; chưa có kiểm định học thuật độc lập hoặc xác nhận PWA trên thiết bị thật.

## V9.4.3
Hồ sơ minh họa Nyantoeic: đăng nhập trực tiếp bằng mật khẩu demo đã cấp; lần đầu trên mỗi trình duyệt tự tạo hồ sơ cục bộ. Không có quyền Admin, không phải điểm thật. Tên dành riêng cho minh họa, không dùng để học thật. Giữ showcase.js và các hook khi nâng cấp; cấu trúc Part 6/7 mới cần tích hợp riêng. Nếu đã có hồ sơ cùng tên, dùng mật khẩu hiện có hoặc chức năng quên mật khẩu. Đóng tất cả tab/PWA để cập nhật cache, không xóa dữ liệu trang web.

## V9.4.4 — Cat Expansion
Thêm 20 mẫu mèo lấy cảm hứng từ giống mèo, 34 mèo thưởng (13 Rare, 10 Super Rare, 6 Epic, 5 Ultra Rare), 45 mẫu tổng cộng. Mở tối đa 50 mèo, gọi đủ bằng một nút. 64 lời thoại cũ giữ nguyên; không trùng lời thoại được gán cho mèo đang hiện. Giữ ID mèo và sự kiện cũ; thêm 20 mốc thưởng, có thể ghi nhận hồi tố theo tiến độ đã lưu. Tỉ lệ cơ bản 55/27/13/5, tăng theo chuỗi chưa có phần thưởng cấp cao, mỗi 10 lượt ưu tiên cấp cao và bảo đảm UR sau 20 lượt chưa nhận UR nếu còn. Thống kê lượt mới bắt đầu từ bản này. Hồ sơ Nyantoeic tự mở 45 mẫu; hồ sơ thường độc lập. Không cam kết tốc độ 50 mèo trên mọi thiết bị.

## V9.4.5 — Mobile Cat Experience
Bảng điều khiển nổi trên máy tính, điện thoại, iPad: 0–50 mèo, +1/+5/+10, thu hết, ngủ/thức, kích thước, giảm chuyển động khi đông. Số lượng và lựa chọn lưu riêng theo hồ sơ/trình duyệt. Ẩn khi làm Test, tập trung, mở hộp thoại hoặc menu mobile; tránh thanh đầu và thanh điều hướng. Hồ sơ demo xenxinhdep tự tạo khi đăng nhập, mở sẵn mèo thưởng hiện có và bổ sung sau này, không tạo điểm hoặc tiến độ giả. Mèo cơ bản đã dùng được ngay, ghi nhận gặp thực tế. Mật khẩu demo công khai, không dùng làm mật khẩu thật. Không có đồng bộ đa thiết bị. Cần kiểm thử iOS/Android thật.
