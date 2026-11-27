/* Each Reading part can have its own entry point and exercise renderer. */
window.readingParts = [
  {id: 'part5', title: 'Part 5', subtitle: 'Hoàn thành câu', href: './index.html'},
  {id: 'part6', title: 'Part 6', subtitle: 'Hoàn thành đoạn văn', href: null},
  {id: 'part7', title: 'Part 7', subtitle: 'Đọc hiểu', href: null}
];
window.lessons = [];
window.mixedTest = [];
window.etsSources = [];
window.stages = [
  {id:'foundation',title:'Cấu trúc câu & từ loại',desc:'Nhìn vị trí trống, nhận diện chức năng của từ.',icon:'book',tone:'sage'},
  {id:'verbs',title:'Động từ & các thì',desc:'Chọn dạng động từ theo chủ ngữ, thời điểm và thể.',icon:'clock',tone:'sand'},
  {id:'clauses',title:'Liên kết câu & mệnh đề',desc:'Đọc quan hệ giữa các vế và nhận diện dạng rút gọn.',icon:'link',tone:'violet'},
  {id:'lexicon',title:'Danh ngữ & từ vựng',desc:'So sánh các lựa chọn bằng cấu trúc, nghĩa và cụm từ.',icon:'text',tone:'sky'},
  {id:'ets',title:'Đối chiếu ETS 2025–2026',desc:'Luyện những cấu trúc bổ sung qua các nguồn đã đối chiếu.',icon:'file',tone:'rose'}
];
window.originalTips = [
  {title:'Nhận diện thể của động từ',original:'Nếu sau chỗ trống có "to - V" hoặc các "cụm giới từ" → Chia động từ bị động',check:'Tìm chủ ngữ rồi hỏi: chủ ngữ thực hiện hay tiếp nhận hành động? Kiểm tra xem động từ có thể dùng ở bị động với nghĩa đang xét hay không.',en:'The shipment arrived at noon.',vi:'Lô hàng đến lúc trưa.',why:'At noon là cụm chỉ thời gian. Arrive là nội động từ. Chủ ngữ the shipment đi với arrived ở thể chủ động.'},
  {title:'Chọn giữa các dạng tính từ',original:'Đuôi "-ing" và đuôi "-ed" là đuôi tính từ không chính thống → đáp án có tính từ đuôi gốc và đuôi "-ing/-ed" → ưu tiên chọn đuôi gốc',check:'Sau khi xác định vị trí cần tính từ, hãy xét nghĩa, ngữ cảnh và cụm từ đi kèm. Không mặc định ưu tiên tính từ gốc hơn tính từ dạng -ing/-ed. Các từ như interested, experienced và qualified đều là tính từ hợp lệ. Lựa chọn đáp án dựa trên sự phù hợp về nghĩa và ngữ pháp của toàn câu. Mẹo gốc chỉ mang tính tham khảo, không phải quy tắc ngữ pháp.',en:'Only interested buyers should contact the agent.',vi:'Chỉ những người mua quan tâm mới nên liên hệ với người môi giới.',why:'Interested buyers là những người mua có quan tâm. Interesting buyers lại miêu tả những người mua thú vị. Cả hai dạng đều là tính từ.'},
  {title:'Tìm động từ chính',original:'Trường hợp 2: Đã có → Loại động từ chia thì → Tìm động từ phụ',check:'Khoanh phạm vi mệnh đề chứa chỗ trống. Một câu có thể có nhiều mệnh đề hoặc các động từ cùng làm vị ngữ nối bằng and.',en:'The report that Lan prepared is ready.',vi:'Bản báo cáo mà Lan soạn đã sẵn sàng.',why:'Prepared nằm trong mệnh đề that Lan prepared. Khi tách phần này ra, the report vẫn cần is làm động từ chính.'}
];
