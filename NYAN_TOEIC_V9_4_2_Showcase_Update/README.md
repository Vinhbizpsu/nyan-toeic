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

## V9.4.1 – NYAN-Demo (hồ sơ minh họa cục bộ)

- Đăng ký hồ sơ **mới** tên `NYAN-Demo`, tự đặt mật khẩu, chọn bắt đầu hồ sơ mới (không sao chép tiến độ). Vào Tài khoản, chọn **Bật hồ sơ minh họa (mở tất cả)** và xác nhận. Không áp dụng cho hồ sơ đã học, Admin hay Khách.
- Hồ sơ này tự đánh dấu đã học toàn bộ lý thuyết, câu hỏi, điểm Test tối đa, từ vựng và mở đủ mèo trong các danh mục hiện tại; câu hỏi đọc được hiển thị đáp án minh họa. Dữ liệu mô phỏng, không phải kết quả thực tế. Không giả lập thành tích chuỗi ngày, thời gian thi hay quyền quản trị. Không cần Supabase.
- Đồng bộ theo danh mục hiện hành khi tải trang/lưu hồ sơ; giữ `showcase.js`, hook trong `app.js` và các danh mục tương ứng ở mọi bản cập nhật sau. Nếu thêm Part 6/7 hoặc đổi schema, cần bổ sung tích hợp; không bảo đảm tự hỗ trợ mô hình dữ liệu chưa tồn tại.
- Tên và chế độ không phải cơ chế kiểm soát quyền máy chủ. Bất kỳ trình duyệt nào có thể tạo hồ sơ minh họa riêng; không ảnh hưởng dữ liệu người khác. Không đồng bộ giữa thiết bị; xóa dữ liệu trang web sẽ mất hồ sơ.
- QA: Chromium harness (không truy cập localhost thật) kiểm tra tạo hồ sơ, toàn bộ câu hỏi/đề/từ/mèo, 24 đoạn đọc, tải lại, đăng xuất/đăng nhập, tài khoản thường, bổ sung giả lập câu hỏi/bài/đề/từ/mèo mới. Regression V9.4: 887 ánh xạ, 18 bố cục, luyện thích ứng, đủ 12 Test và phân lập tài khoản. Chưa xác nhận GitHub Pages sau triển khai hay thiết bị thật.

## V9.4.2
Hỗ trợ tên hồ sơ minh họa mới `NYAN-Showcase` bên cạnh `NYAN-Demo`. Cả hai chỉ kích hoạt khi hồ sơ chưa học; không đổi dữ liệu tài khoản cũ.
