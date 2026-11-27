/* The year of a book edition and the date of an exam sitting are distinct. */
window.etsSources = [
 {label:'ETS · Tài liệu chuẩn bị chính thức',url:'https://www.ets.org/toeic/test-takers/prepare.html',note:'Nguồn tham khảo định dạng và tài liệu chuẩn bị chính thức. Câu luyện NYAN không phải câu ETS.'},
 {label:'IIBC · Mẫu Part 5',url:'https://www.iibc-global.org/toeic/test/lr/about/format/sample05.html',note:'Mẫu câu hoàn thành câu; Part 5 gồm 30 câu.'},
 {label:'YBM · Công bố nửa đầu 2026',url:'https://www.toeicstory.co.kr/2599',note:'Trang công bố chính thức; chưa đối chiếu từng câu trong video gốc.'},
 {label:'YBM · Công bố nửa cuối 2025',url:'https://www.toeicstory.co.kr/2536',note:'Trang công bố chính thức, dẫn tới bài giảng. Không sao chép đề.'}
];

window.lessons.push(
  {
    id: 'ets-result-patterns',
    stage: 'ets',
    title: 'Mức độ và kết quả',
    summary: 'Đọc đến vế sau để phân biệt so, such, too và enough.',
    sourceNote: 'Mức độ và kết quả: nhóm cấu trúc tự biên soạn để luyện Part 5. Chưa xác minh câu gốc tương ứng trong đề ETS.',
    sourceUrl: 'https://www.iibc-global.org/toeic/test/lr/about/format/sample05.html',
    rules: [
      {
        title: 'So + tính từ hoặc trạng từ + that + mệnh đề',
        body: 'So nhấn mạnh mức độ dẫn tới một kết quả. Sau that, tìm chủ ngữ và động từ nêu kết quả. Với so many, so few, so much, so little, thứ được nhấn mạnh là số lượng.',
        examples: [{
          en: 'The figures changed so rapidly that we revised the forecast twice.',
          vi: 'Các số liệu thay đổi nhanh đến mức chúng tôi phải điều chỉnh dự báo hai lần.',
          why: 'Rapidly mô tả tốc độ thay đổi, còn we revised… nêu hệ quả của tốc độ đó.',
          quick: 'Thấy that + chủ ngữ + động từ, quay lại xem trước that là tính từ hay trạng từ chỉ mức độ.'
        }]
      },
      {
        title: 'Such + cụm danh từ + that + mệnh đề',
        body: 'Với danh từ đếm được số ít, mẫu thông dụng là such a/an + tính từ + danh từ. Với danh từ số nhiều hoặc không đếm được, bỏ a/an.',
        examples: [{
          en: 'The repair caused such a long delay that the client canceled the order.',
          vi: 'Việc sửa chữa gây chậm trễ lâu đến mức khách hàng đã hủy đơn.',
          why: 'A long delay là cả một cụm danh từ. Such đứng trước cụm này để chỉ mức độ.',
          quick: 'Khoanh cụm a long delay và đọc tiếp đến hệ quả sau that.'
        }]
      },
      {
        title: 'Too + tính từ + to V và tính từ + enough + to V',
        body: 'Too biểu thị mức độ vượt giới hạn cho phép. Enough biểu thị đạt mức cần thiết và đứng sau tính từ, nhưng đứng trước danh từ, như enough time. For + người/vật có thể đặt trước to V.',
        examples: [{
          en: 'The crate is too wide to fit through the door.',
          vi: 'Thùng hàng quá rộng nên không thể đưa qua cửa.',
          why: 'Chiều rộng vượt kích thước cửa. Too wide diễn tả trở ngại, to fit nêu hành động bị cản.',
          quick: 'Hỏi mức độ đang cản trở hay cho phép hành động sau to.'
        }, {
          en: 'The entrance is wide enough for the cart to pass through.',
          vi: 'Lối vào đủ rộng để xe đẩy đi qua.',
          why: 'Wide enough đạt ngưỡng cần thiết. The cart là vật thực hiện hành động pass through.',
          quick: 'Đọc theo cụm tính từ + enough, rồi tìm hành động khả thi.'
        }]
      }
    ],
    questions: [
      {
        stem: 'The print on the label was ___ small that the cashier needed a magnifying glass.',
        options: ['such', 'enough', 'so', 'too'], answer: 2,
        vi: 'Chữ trên nhãn nhỏ đến mức thu ngân phải dùng kính lúp.',
        reason: 'Small là tính từ. That the cashier needed… là một mệnh đề nêu kết quả, tạo mẫu so small that…',
        quick: 'Nhận ra cặp so … that, sau đó kiểm tra giữa chúng là tính từ small.',
        explain: ['Such cần cụm danh từ, như such small print.', 'Enough phải đứng sau small khi bổ nghĩa cho tính từ.', 'So nối mức độ small với hệ quả sau that.', 'Too small thường dẫn đến to V khi mô tả một trở ngại.']
      },
      {
        stem: 'There was ___ heavy traffic that the delivery van missed its time slot.',
        options: ['such', 'very', 'many', 'enough'], answer: 0,
        vi: 'Giao thông đông đến mức xe giao hàng lỡ khung giờ đã hẹn.',
        reason: 'Heavy traffic là cụm danh từ không đếm được. Mệnh đề sau that nêu hậu quả nên dùng such heavy traffic that…',
        quick: 'Tìm danh từ traffic bên phải heavy và mệnh đề kết quả ở xa hơn.',
        explain: ['Such đi với cả cụm heavy traffic rồi đến that.', 'Very có thể nhấn mạnh heavy nhưng không tạo cặp chỉ kết quả với that trong câu này.', 'Many cần danh từ đếm được số nhiều.', 'Enough traffic diễn tả đủ lưu lượng, không tạo cấu trúc kết quả này.']
      },
      {
        stem: 'The service elevator can carry four hundred kilograms, so it is strong ___ to lift the new copier.',
        options: ['so', 'too', 'such', 'enough'], answer: 3,
        vi: 'Thang máy chở hàng chịu được bốn trăm ki-lô-gam, vì vậy nó đủ khỏe để nâng chiếc máy photocopy mới.',
        reason: 'Chỗ trống đứng sau strong. Thông số tải trọng giải thích vì sao thang có thể nâng máy.',
        quick: 'Tìm strong ___ to lift. Mức độ cho phép hành động dùng strong enough.',
        explain: ['So đứng trước tính từ khi nói về mức độ.', 'Too phải đứng trước strong và sẽ diễn đạt vượt ngưỡng.', 'Such giới thiệu một cụm danh từ.', 'Enough đứng sau strong và cho biết đã đạt tải trọng cần thiết.']
      },
      {
        stem: 'The help desk received ___ many calls about the outage that a second team had to assist.',
        options: ['too', 'so', 'such', 'very'], answer: 1,
        vi: 'Bộ phận hỗ trợ nhận được nhiều cuộc gọi về sự cố đến mức phải có thêm một nhóm hỗ trợ.',
        reason: 'Many cho biết thứ được nhấn mạnh là số lượng cuộc gọi. Câu dùng so many + danh từ số nhiều + that + mệnh đề.',
        quick: 'Đừng chốt such chỉ vì thấy calls. Ngay trước calls có many và phía sau có that.',
        explain: ['Too many có nghĩa quá nhiều, song không mở cấu trúc kết quả với that như ở đây.', 'So many calls that… liên kết số lượng với hệ quả phải huy động người.', 'Such có thể đứng trước cụm danh từ nhưng không dùng such many calls.', 'Very không ghép được với vế that theo mẫu nêu kết quả trong câu này.']
      }
    ]
  },
  {
    id: 'ets-preposition-relative',
    stage: 'ets',
    title: 'Giới từ đứng trước which và whom',
    summary: 'Chọn giới từ theo mốc thời gian, quan hệ không gian hoặc cụm từ của mệnh đề sau.',
    sourceNote: 'Giới từ và mệnh đề quan hệ: nhóm luyện tự biên soạn, không gán số câu hoặc năm thi ETS.',
    sourceUrl: 'https://www.ets.org/toeic/test-takers/prepare.html',
    rules: [
      {
        title: 'Mốc thời gian và thứ tự sự việc',
        body: 'After which mở mệnh đề nói việc xảy ra sau mốc hay sự kiện vừa nêu. During which mô tả việc diễn ra trong chính khoảng đó. Before which phù hợp khi việc xảy ra sớm hơn mốc.',
        examples: [{
          en: 'The shop closes at nine, after which the cleaners may enter.',
          vi: 'Cửa hàng đóng cửa lúc chín giờ, sau đó nhân viên vệ sinh được phép vào.',
          why: 'Việc được phép vào bắt đầu sau khi cửa hàng đóng cửa. Which dẫn lại mốc hoặc sự kiện vừa nêu.',
          quick: 'Gọi hai việc là A và B. B xảy ra sau A thì thử after which.'
        }, {
          en: 'We allow a ten-minute break, during which visitors may use their phones.',
          vi: 'Chúng tôi dành mười phút giải lao, trong thời gian đó khách có thể dùng điện thoại.',
          why: 'Việc dùng điện thoại xảy ra trong khoảng nghỉ kéo dài mười phút.',
          quick: 'Thử thay during which bằng during the break.'
        }]
      },
      {
        title: 'Khôi phục cụm từ của mệnh đề sau',
        body: 'Khi động từ hoặc danh từ đòi một giới từ, hãy đặt danh từ đứng trước which về lại vị trí thường gặp. Ví dụ, từ depend on a service có thể tạo the service on which we depend.',
        examples: [{
          en: 'The diagram shows the network on which the scanners depend.',
          vi: 'Sơ đồ cho biết mạng mà các máy quét phụ thuộc vào.',
          why: 'Tách thành The scanners depend on the network. On thuộc cấu trúc depend on.',
          quick: 'Đọc phần sau which trước. Nếu thấy depend thì kiểm tra on.'
        }]
      },
      {
        title: 'Chọn whom hay which sau giới từ',
        body: 'Khi giới từ đứng ngay trước đại từ quan hệ, dùng whom cho người và which cho vật. Với số lượng, dùng một biểu thức như two of whom hoặc most of which.',
        examples: [{
          en: 'Five interns joined the lab, two of whom had studied chemistry.',
          vi: 'Năm thực tập sinh vào làm ở phòng thí nghiệm, trong đó hai người từng học hóa.',
          why: 'Two of the five interns chỉ hai người trong một nhóm. Of đứng ngay trước đại từ nên dùng whom.',
          quick: 'Thay two of whom bằng two of the interns để kiểm tra đối tượng được nói đến.'
        }]
      }
    ],
    questions: [
      {
        stem: 'The office will close at noon, ___ which all callers will be directed to the evening helpline.',
        options: ['among', 'inside', 'across', 'after'], answer: 3,
        vi: 'Văn phòng sẽ đóng cửa lúc mười hai giờ trưa, sau đó mọi cuộc gọi sẽ được chuyển đến đường dây hỗ trợ buổi tối.',
        reason: 'Noon là thời điểm đóng cửa. Việc chuyển cuộc gọi xảy ra sau mốc này nên dùng after which.',
        quick: 'Thử đọc after noon. Ba phương án còn lại chủ yếu diễn đạt vị trí hoặc hướng.',
        explain: ['Among diễn tả vị trí trong một nhóm.', 'Inside diễn tả ở bên trong một không gian hoặc giới hạn, không diễn đạt mốc kế tiếp ở đây.', 'Across chỉ sự đi ngang qua hoặc trải rộng.', 'After nối mốc đóng cửa với việc chuyển cuộc gọi xảy ra sau đó.']
      },
      {
        stem: 'The hall has a secure cabinet in ___ the museum stores spare audio guides.',
        options: ['whose', 'which', 'that', 'whom'], answer: 1,
        vi: 'Trong sảnh có một chiếc tủ an toàn mà bảo tàng dùng để cất các thiết bị thuyết minh dự phòng.',
        reason: 'Tách câu thành The museum stores spare audio guides in the cabinet. Cabinet là vật, còn in đã đứng trước chỗ trống.',
        quick: 'Khi thấy in ___ và danh từ được nói tới là vật, thử ngay in which.',
        explain: ['Whose biểu thị sở hữu và thường đứng trước một danh từ.', 'Which thay cabinet sau giới từ in.', 'That không đứng ngay sau giới từ được đưa lên đầu mệnh đề quan hệ.', 'Whom chỉ người, trong khi cabinet là vật.']
      },
      {
        stem: 'The pilot lasted six weeks, ___ which the team recorded each delivery time to compare the two routes.',
        options: ['during', 'among', 'onto', 'beyond'], answer: 0,
        vi: 'Đợt thử nghiệm kéo dài sáu tuần, trong thời gian đó nhóm ghi lại thời gian từng lượt giao hàng để so sánh hai tuyến.',
        reason: 'Six weeks là khoảng thời gian thực hiện thử nghiệm và ghi dữ liệu. During the pilot tạo đúng quan hệ thời gian.',
        quick: 'Hỏi dữ liệu được thu khi nào. Nhóm ghi dữ liệu trong đợt thử nghiệm.',
        explain: ['During chỉ hoạt động xảy ra bên trong khoảng sáu tuần.', 'Among cần một nhóm người hoặc vật để nói về quan hệ giữa các thành viên.', 'Onto diễn đạt chuyển động lên bề mặt.', 'Beyond diễn đạt vượt quá một giới hạn, không phù hợp với thời gian thu dữ liệu của đợt thử nghiệm.']
      },
      {
        stem: 'The two translators, neither of ___ had seen the draft before, spotted the same error.',
        options: ['them', 'which', 'whom', 'who'], answer: 2,
        vi: 'Cả hai biên dịch viên đều chưa từng xem bản nháp nhưng cùng phát hiện một lỗi giống nhau.',
        reason: 'Spot là động từ chính ở dạng spotted. Phần giữa hai dấu phẩy là mệnh đề quan hệ bổ sung về hai người, bắt đầu bằng neither of whom.',
        quick: 'Nhận ra neither of + đại từ quan hệ chỉ người rồi kiểm tra động từ chính sau dấu phẩy.',
        explain: ['Them là đại từ tân ngữ thông thường, không phải đại từ quan hệ, nên không thể mở mệnh đề chen vào câu chính.', 'Which dùng cho vật hoặc sự việc.', 'Whom theo of và thay cho hai biên dịch viên.', 'Who là dạng chủ ngữ, không dùng ngay sau of ở mẫu này.']
      }
    ]
  },
  {
    id: 'ets-anticipatory-it',
    stage: 'ets',
    title: 'Chủ ngữ giả it và người thực hiện hành động',
    summary: 'Đọc được câu dài có it, tính từ, cụm for hoặc of và động từ nguyên mẫu.',
    sourceNote: 'Chủ ngữ giả it: nhóm luyện tự biên soạn. Đã xác minh trang công bố YBM 2026, chưa đối chiếu từng câu trong video.',
    sourceUrl: 'https://www.toeicstory.co.kr/2599',
    rules: [
      {
        title: 'It + be + tính từ + (for + người) + to V',
        body: 'It giữ chỗ ở đầu câu. Nội dung được đánh giá nằm ở cụm to V. For giới thiệu người thực hiện hành động khi cần nói rõ người đó là ai.',
        examples: [{
          en: 'It is essential for couriers to display their badges.',
          vi: 'Nhân viên giao hàng bắt buộc phải đeo thẻ ở vị trí dễ thấy.',
          why: 'Điều cần thiết là việc đeo thẻ. Couriers thực hiện hành động display.',
          quick: 'Hỏi “việc gì là cần thiết?” rồi đọc cụm to display their badges.'
        }]
      },
      {
        title: 'For chỉ người thực hiện, of đi với lời đánh giá hành vi',
        body: 'Với difficult, possible hoặc essential, for thường cho biết ai thực hiện việc đó. Với kind, thoughtful hoặc careless, of thường chỉ người được khen hay chê vì hành động vừa nêu.',
        examples: [{
          en: 'It was thoughtful of Linh to reserve a seat by the door.',
          vi: 'Linh thật chu đáo khi giữ một chỗ gần cửa.',
          why: 'Thoughtful đánh giá sự chu đáo mà Linh thể hiện qua hành động giữ chỗ.',
          quick: 'Thử viết Linh was thoughtful to do that. Nếu nghĩa được giữ nguyên, of là lựa chọn tự nhiên.'
        }]
      },
      {
        title: 'Find hoặc make + it + tính từ + to V',
        body: 'Sau find hoặc make, it cũng có thể giữ chỗ cho một hành động được nói ở cuối câu. Khi ấy chủ ngữ thật sự của cả câu vẫn đứng trước find hoặc make.',
        examples: [{
          en: 'Clear labels make it easier to sort the returned parcels.',
          vi: 'Nhãn rõ ràng giúp việc phân loại các bưu kiện hoàn trả trở nên dễ dàng hơn.',
          why: 'Clear labels là chủ ngữ của make. It làm tân ngữ hình thức, còn to sort… nêu việc trở nên dễ hơn.',
          quick: 'Nhìn đủ ba vị trí make + it + easier trước khi đọc cụm to V.'
        }]
      }
    ],
    questions: [
      {
        stem: '___ is possible for staff to submit their travel receipts online.',
        options: ['There', 'They', 'It', 'These'], answer: 2,
        vi: 'Nhân viên có thể nộp biên lai đi công tác qua mạng.',
        reason: 'Cả hành động nộp biên lai được đánh giá là khả thi. Mẫu câu là It is possible for someone to do something.',
        quick: 'Đọc is possible for … to submit rồi tìm chủ ngữ giả it.',
        explain: ['There is thường giới thiệu sự tồn tại của một danh từ, chẳng hạn There is a way.', 'They là chủ ngữ số nhiều và không đi với is.', 'It giữ chỗ cho việc submit receipts.', 'These là số nhiều và không phù hợp với is.']
      },
      {
        stem: 'It is difficult ___ technicians to inspect the roof in high winds.',
        options: ['to', 'for', 'at', 'from'], answer: 1,
        vi: 'Kỹ thuật viên khó có thể kiểm tra mái nhà khi gió lớn.',
        reason: 'Technicians là người thực hiện inspect. Difficult đánh giá độ khó của công việc, nên dùng for technicians.',
        quick: 'Xác định ai kiểm tra mái nhà, rồi ghép for + người đó + to inspect.',
        explain: ['To đã có trước inspect và không giới thiệu người thực hiện ở vị trí này.', 'For đánh dấu người phải thực hiện việc khó.', 'At thường chỉ một địa điểm, thời điểm hoặc xuất hiện trong be good at.', 'From nói về nguồn gốc hay điểm xuất phát.']
      },
      {
        stem: 'It was considerate ___ the coordinator to provide large-print agendas for the guests.',
        options: ['with', 'at', 'from', 'of'], answer: 3,
        vi: 'Điều phối viên thật chu đáo khi chuẩn bị chương trình nghị sự in chữ lớn cho khách.',
        reason: 'Considerate nhận xét cách điều phối viên đối xử với khách. Dùng considerate of someone to do something.',
        quick: 'Thử đọc The coordinator was considerate. Tính từ đánh giá con người qua hành động.',
        explain: ['With không giới thiệu người được đánh giá sau considerate ở mẫu này.', 'At không tạo được cấu trúc considerate at someone to do.', 'From chỉ nguồn hoặc điểm xuất phát.', 'Of giới thiệu người có hành động chu đáo.']
      },
      {
        stem: 'Staff on the night shift find ___ difficult to reach the warehouse after the last bus departs.',
        options: ['it', 'them', 'there', 'its'], answer: 0,
        vi: 'Nhân viên ca đêm thấy khó đến kho sau khi chuyến xe buýt cuối cùng rời bến.',
        reason: 'Cụm to reach the warehouse là việc bị đánh giá là khó. Mẫu là find it difficult to V.',
        quick: 'Bỏ cụm on the night shift, rồi đọc Staff find ___ difficult to reach…',
        explain: ['It là tân ngữ giữ chỗ trong find it difficult to V.', 'Them phải quy chiếu đến một nhóm đã xác định. Câu đang đánh giá một hành động.', 'There không giữ vai trò tân ngữ hình thức sau find.', 'Its biểu thị sở hữu và cần danh từ theo sau.']
      }
    ]
  }
);
