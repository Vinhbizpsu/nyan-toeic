/* V4: question-to-rule mapping curated from the existing question stems and lesson rules.
   Rule IDs are stable 1-based indices; do not reorder without a migration. */
window.nyanRuleMap = {
 'khung-cau':[1,2,4,3,1,1,2,4,3,2,3],
 'ho-tu':[1,1,3,1,1,1,1,1,1,3,1],
 'cum-danh-tu':[3,2,4,4,3,2,3,4,2,1,1],
 'tinh-tu':[2,3,4,2,2,3,3,4,4,2,1],
 'trang-tu':[1,2,4,5,1,2,3,4,2,1,5],
 'hoa-hop-chu-vi':[2,3,4,4,2,3,3,4,4,2,5],
 'thi-don-tiep-dien':[1,3,2,3,1,3,2,3,4,1,3],
 'thi-hoan-thanh':[1,1,3,4,1,1,3,3,4,2,4],
 'the-chu-dong-bi-dong':[1,2,3,4,1,1,2,2,3,4,2],
 'dang-dong-tu':[1,1,2,5,1,1,2,3,4,4,5],
 'gioi-tu':[3,1,2,4,1,1,2,3,3,4,4],
 'lien-tu-tu-noi':[1,1,3,4,1,1,2,3,3,4,4],
 'menh-de-quan-he':[1,2,3,3,1,2,3,4,3,3,1],
 'menh-de-rut-gon':[1,2,3,2,1,2,3,2,1,3,3],
 'cau-truc-song-song':[2,2,1,3,1,1,2,2,2,1,3],
 'articles-countability':[1,3,2,1,1,1,3,3,2,3,1],
 'quantifiers':[1,1,2,3,1,1,1,2,3,3,1],
 'pronouns':[1,2,3,4,1,1,1,2,3,3,4],
 'comparisons':[2,3,1,1,2,2,3,1,1,2,3],
 'workplace-collocations':[2,1,4,3,1,2,3,2,2,1,4],
 'context-vocabulary':[2,1,3,3,1,1,1,2,2,2,3],
 'ets-result-patterns':[1,2,3,1,1,2,3,3,1,2,1],
 'ets-preposition-relative':[1,2,1,3,1,2,1,3,3,3,3],
 'ets-anticipatory-it':[1,1,2,3,1,1,2,3,3,1,2]
};
window.nyanMockMap = [
 ['trang-tu',1],['context-vocabulary',1],['lien-tu-tu-noi',1],['menh-de-quan-he',2],['workplace-collocations',3],['quantifiers',1],['hoa-hop-chu-vi',5],['context-vocabulary',1],['the-chu-dong-bi-dong',2],['context-vocabulary',1],['dang-dong-tu',2],['lien-tu-tu-noi',4],['context-vocabulary',1],['pronouns',1],['context-vocabulary',2],['dang-dong-tu',1],['workplace-collocations',4],['thi-hoan-thanh',1],['lien-tu-tu-noi',2],['context-vocabulary',1],['menh-de-rut-gon',2],['context-vocabulary',2],['quantifiers',1],['workplace-collocations',2],['comparisons',2],['trang-tu',1],['workplace-collocations',2],['cau-truc-song-song',2],['context-vocabulary',1],['context-vocabulary',3]
];
/* Lesson-level quick cards; qualifiers are intentional, not absolute rules. */
window.nyanQuickCards = {
 'khung-cau': [['S + V (+ O/C)','Tìm vị ngữ trong từng mệnh đề.'],['modal + V','Can/must + nguyên mẫu không to.'],['V-ing … + V số ít','Khi chủ ngữ là một hoạt động đơn lẻ.']],
 'ho-tu': [['N / V / Adj / Adv','Xác định chức năng trước khi xét đuôi từ.'],['Adj + N','Tìm danh từ chính trong cụm.'],['V + Adv','Xét nghĩa và từ được bổ nghĩa; không chỉ nhìn -ly.']],
 'cum-danh-tu': [['(modifier) + N','Từ chính quyết định số lượng.'],['N + N','Danh từ đầu có thể phân loại danh từ sau.'],["N’s / Ns’ + N",'Xác định quan hệ sở hữu và số lượng.']],
 'tinh-tu': [['Adj + N','Mô tả danh từ.'],['linking V + Adj','Miêu tả chủ ngữ; phân biệt động từ hành động.'],['-ing / -ed','Xét nghĩa của tính từ trong ngữ cảnh.']],
 'trang-tu': [['V + Adv','Cách thức hoặc tần suất.'],['Adv + Adj / Adv','Mức độ bổ nghĩa.'],['hard ≠ hardly','Không mặc định -ly giữ nguyên nghĩa.']],
 'hoa-hop-chu-vi': [['S chính → V','Bỏ cụm chen giữa khi xác định hòa hợp.'],['each / every + N số ít','Thường dùng động từ số ít.'],['a number of / the number of','Thường tương ứng V số nhiều / số ít.']],
 'thi-don-tiep-dien': [['V(s/es)','Thói quen, lịch cố định.'],['be + V-ing','Quá trình đang diễn ra hoặc lịch đã thu xếp.'],['V2 / was, were + V-ing','Sự kiện quá khứ / quá trình tại mốc quá khứ.']],
 'thi-hoan-thanh': [['have/has + V3','Liên hệ đến hiện tại.'],['had + V3','Trước một mốc quá khứ.'],['will have + V3','Hoàn tất trước mốc tương lai.']],
 'the-chu-dong-bi-dong': [['S + V','Chủ ngữ thực hiện hoặc được mô tả.'],['be + V3','Dạng bị động thường gặp; giữ đúng thì.'],['intransitive V','Không bị động hóa nội động từ theo nghĩa đó.']],
 'dang-dong-tu': [['agree + to V','Nhớ mẫu theo động từ đứng trước.'],['avoid + V-ing','Một số động từ yêu cầu V-ing.'],['look forward to + N/V-ing','To ở đây là giới từ.']],
 'gioi-tu': [['at / on / in','Mốc giờ / ngày / khoảng thời gian, với các ngoại lệ.'],['by / until','Hạn chót / kéo dài đến mốc.'],['for / since / during','Khoảng dài / điểm bắt đầu / trong sự kiện.']],
 'lien-tu-tu-noi': [['although / because + S + V','Mệnh đề hữu hạn thường gặp.'],['despite / because of + N/V-ing','Cụm danh từ hoặc V-ing phù hợp ngữ cảnh.'],['However, …','Trạng từ nối; kiểm tra dấu câu và nghĩa.']],
 'menh-de-quan-he': [['who / whom / which / that','Xét tiền ngữ và chức năng trong mệnh đề.'],['whose + N','Quan hệ sở hữu.'],['where / preposition + which','Chỉ nơi chốn hoặc quan hệ giới từ phù hợp.']],
 'menh-de-rut-gon': [['N + V-ing','Danh từ thực hiện hành động.'],['N + V3','Danh từ nhận tác động.'],['V-ing/V3 …, S + V','Cụm đầu câu phải gắn đúng chủ ngữ.']],
 'cau-truc-song-song': [['X, Y and Z','Cùng chức năng cú pháp.'],['either … or / neither … nor','Giữ đúng cặp.'],['Not only …','Đảo ngữ khi cụm phủ định đứng đầu mệnh đề.']],
 'articles-countability': [['a / an + N đếm được số ít','Chọn theo âm đầu, không chỉ chữ cái.'],['the + N','Đối tượng xác định được.'],['a piece of + N không đếm được','Đếm theo đơn vị.']],
 'quantifiers': [['many / few + N số nhiều','Danh từ đếm được.'],['much / little + N không đếm được','Lượng không đếm trực tiếp.'],['each / both / none','Xét số lượng và phạm vi nhóm.']],
 'pronouns': [['I / me / my / mine','Chủ ngữ / tân ngữ / hạn định / đại từ sở hữu.'],['another / other / others','Xét danh từ theo sau và nhóm xác định.'],['those','Có thể thay danh từ số nhiều.']],
 'comparisons': [['as + Adj/Adv + as','So sánh ngang bằng.'],['-er / more … than','So sánh hơn.'],['the -est / most …','So sánh nhất; xét phạm vi nhóm.']],
 'workplace-collocations': [['meet a deadline','Học cụm, không học từ rời.'],['eligible for / comply with','Nhớ giới từ đi kèm.'],['issue a refund','Xét vai trò các bên trong giao dịch.']],
 'context-vocabulary': [['Loại từ → nghĩa','Thu hẹp lựa chọn theo cấu trúc.'],['Dấu hiệu ngữ cảnh','Đọc nguyên nhân, kết quả và mục đích.'],['Đọc lại cả câu','Kiểm tra nghĩa và kết hợp từ.']],
 'ets-result-patterns': [['so + Adj/Adv + that','Kết quả; có mẫu so many/much/few/little.'],['such + N phrase + that','Kiểm tra mạo từ và số lượng.'],['too … to / … enough to','Quá mức / đủ mức.']],
 'ets-preposition-relative': [['after/during + which','Quan hệ thời gian.'],['preposition + which/whom','Khôi phục cụm giới từ.'],['all of which / two of whom','Which cho vật, whom cho người trong mẫu này.']],
 'ets-anticipatory-it': [['It is + Adj + to V','It làm chủ ngữ giả.'],['for / of + person','Xét người thực hiện hay đánh giá hành vi.'],['find/make + it + Adj + to V','It làm tân ngữ giả.']]
};
