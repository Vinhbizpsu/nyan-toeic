/* Các câu tiếng Anh và lời giải dưới đây được biên soạn riêng cho bài học. */
window.lessons.push(...[
  {
    id: 'khung-cau',
    stage: 'foundation',
    title: 'Tìm khung chính của câu',
    summary: 'Tìm chủ ngữ, cụm động từ và ranh giới mệnh đề trước khi quyết định dạng cần điền.',
    rules: [
      {
        title: 'Tìm chủ ngữ và xác định vai trò của nó',
        body: 'Một câu kể thường có chủ ngữ (S) và cụm động từ làm vị ngữ (V). Động từ quyết định thành phần tiếp theo. Một số động từ tự đứng được, một số cần tân ngữ (O), một số nối chủ ngữ với đặc điểm hoặc danh tính của nó. Ở câu bị động, chủ ngữ có thể là đối tượng nhận hành động. Với động từ nối, chủ ngữ là đối tượng được mô tả. Cụm thời gian hoặc nơi chốn thường cung cấp thêm bối cảnh.',
        examples: [{
          en: 'The courier delivered the parcel this morning.',
          vi: 'Nhân viên chuyển phát đã giao bưu kiện sáng nay.',
          why: 'The courier trả lời “ai giao?”, delivered là hành động, the parcel trả lời “giao cái gì?”, còn this morning cho biết thời điểm.',
          quick: 'Xác định người giao và thứ được giao trước. Cụm thời gian có thể tạm gác lại để nhìn ra S + V + O.'
        }]
      },
      {
        title: 'Nhận ra động từ đã chia trong cụm',
        body: 'Trong một mệnh đề độc lập, động từ có thể đứng riêng (works, arrived) hoặc là một cụm (is working, has arrived, can work). Khi có nhiều thành phần, trợ động từ đầu tiên mang dấu hiệu chia của cụm. To + V hoặc V-ing đứng riêng thường đảm nhiệm chức năng khác trong câu.',
        examples: [{
          en: 'The assistants are preparing the room for the interview.',
          vi: 'Các trợ lý đang chuẩn bị phòng cho buổi phỏng vấn.',
          why: 'Are đi với chủ ngữ số nhiều và kết hợp với preparing thành cụm động từ ở hiện tại tiếp diễn.',
          quick: 'Đọc liền are preparing. Nếu bỏ are thì câu kể này thiếu động từ đã chia.'
        }]
      },
      {
        title: 'Xét mệnh đề chứa chỗ trống',
        body: 'Một câu có thể chứa nhiều động từ đã chia vì mỗi mệnh đề có thể có vị ngữ riêng. Những từ như who, that, although, when giúp nhận ra ranh giới. Hai hành động cũng có thể cùng chủ ngữ khi được nối bằng and.',
        examples: [{
          en: 'The files that the director requested are on the desk.',
          vi: 'Những hồ sơ mà giám đốc yêu cầu đang ở trên bàn.',
          why: 'Requested thuộc mệnh đề that the director requested. Chủ ngữ The files của mệnh đề chính cần are.',
          quick: 'Tạm bỏ phần từ that đến requested, rồi đọc The files are on the desk.'
        }]
      },
      {
        title: 'Cụm V-ing có thể làm chủ ngữ',
        body: 'Một hoạt động có thể đứng đầu câu dưới dạng V-ing cùng các từ phụ thuộc. Đọc hết cụm chỉ hoạt động rồi mới tìm động từ của mệnh đề chính. Khi một hoạt động đơn lẻ làm chủ ngữ, động từ đi với nó thường ở số ít.',
        examples: [{
          en: 'Reviewing customer complaints takes time.',
          vi: 'Việc xem xét các khiếu nại của khách hàng cần có thời gian.',
          why: 'Reviewing customer complaints là toàn bộ hoạt động được nói đến. Complaints là đối tượng được xem xét, còn takes là động từ của mệnh đề chính.',
          quick: 'Thử thay cả cụm đầu câu bằng “việc này”. Từ còn lại chỉ hành động hoặc trạng thái của “việc này” chính là động từ cần tìm.'
        }]
      }
    ],
    questions: [
      {
        stem: 'Every morning, the bakery ___ its first batch of bread before six.',
        options: ['preparing', 'prepares', 'to prepare', 'preparation'], answer: 1,
        vi: 'Mỗi sáng, tiệm bánh chuẩn bị mẻ bánh mì đầu tiên trước sáu giờ.',
        reason: 'The bakery là chủ ngữ số ít. Câu kể về một việc lặp lại và còn thiếu động từ đã chia ở hiện tại đơn.',
        quick: 'Bỏ hai cụm thời gian, đọc the bakery ___ its first batch.',
        explain: ['Preparing cần trợ động từ nếu tạo thành thì tiếp diễn ở đây.', 'Prepares tạo vị ngữ và hòa hợp với the bakery.', 'To prepare không đứng một mình làm vị ngữ cho câu này.', 'Preparation là danh từ chỉ sự chuẩn bị.']
      },
      {
        stem: 'The new scanners can ___ both sides of a page at once.',
        options: ['reading', 'readable', 'reads', 'read'], answer: 3,
        vi: 'Các máy quét mới có thể đọc cả hai mặt của một trang cùng lúc.',
        reason: 'Can đứng trước chỗ trống và cần động từ nguyên mẫu không to. Read còn nhận được tân ngữ both sides of a page.',
        quick: 'Nhìn can trước. Sau khi tìm nguyên mẫu, kiểm tra read both sides có nghĩa.',
        explain: ['Reading là dạng -ing, không theo ngay sau can trong cấu trúc này.', 'Readable là tính từ mang nghĩa có thể đọc được.', 'Reads là dạng chia ngôi thứ ba số ít.', 'Read là nguyên mẫu thích hợp sau can.']
      },
      {
        stem: 'Testing the new devices before shipment ___ several hours.',
        options: ['takes', 'take', 'taking', 'to take'], answer: 0,
        vi: 'Việc kiểm tra các thiết bị mới trước khi giao hàng mất vài giờ.',
        reason: 'Chủ ngữ là cả hoạt động testing the new devices before shipment. Hoạt động này được xem là số ít và cần takes.',
        quick: 'Đổi cụm testing … shipment thành “this process”. Hãy thử This process takes several hours.',
        explain: ['Takes là động từ đã chia cho một hoạt động làm chủ ngữ.', 'Take sẽ hợp với chủ ngữ số nhiều, nhưng devices là tân ngữ của testing.', 'Taking khiến câu thiếu động từ đã chia.', 'To take là dạng nguyên mẫu có to và không tạo được vị ngữ cần điền.']
      },
      {
        stem: 'The list of suppliers that our purchasing officers contacted last week ___ on the shared drive.',
        options: ['being', 'are', 'is', 'to be'], answer: 2,
        vi: 'Danh sách các nhà cung cấp mà nhân viên thu mua đã liên hệ tuần trước nằm trên ổ đĩa dùng chung.',
        reason: 'Contacted thuộc mệnh đề bổ nghĩa cho suppliers. Từ chính của chủ ngữ mệnh đề chính là list, số ít, nên chọn is.',
        quick: 'Rút gọn trong đầu thành The list ___ on the shared drive.',
        explain: ['Being cần một cấu trúc khác để có động từ đã chia.', 'Are có thể khiến bạn liên tưởng đến suppliers hoặc officers, nhưng cả hai đều không phải từ chính của chủ ngữ mệnh đề chính.', 'Is hòa hợp với list và nối danh sách với vị trí lưu.', 'To be không thể đứng độc lập làm vị ngữ ở đây.']
      }
    ]
  },
  {
    id: 'ho-tu',
    stage: 'foundation',
    title: 'Nhận diện họ từ',
    summary: 'Dùng vị trí và nghĩa để chọn giữa các từ cùng gốc, kể cả khi hai đáp án có cùng từ loại.',
    rules: [
      {
        title: 'Xác định chức năng trước khi so đuôi từ',
        body: 'Khi các đáp án cùng gốc, thử đoán chỗ trống đang gọi tên sự vật, diễn đạt hành động, mô tả danh từ hay bổ nghĩa cho hành động. Sau đó mới tìm danh từ, động từ, tính từ hoặc trạng từ tương ứng.',
        examples: [{
          en: 'We need written confirmation of the booking.',
          vi: 'Chúng tôi cần văn bản xác nhận việc đặt chỗ.',
          why: 'Need nhận cả cụm written confirmation of the booking làm tân ngữ. Written đã mô tả thứ cần nhận, nên confirmation là danh từ chính.',
          quick: 'Hỏi “cần cái gì?” rồi đọc liền written confirmation.'
        }]
      },
      {
        title: 'Hậu tố thu hẹp lựa chọn',
        body: 'Danh từ thường có đuôi -tion, -ment, -ness, -ity, -ance hoặc -ence. Tính từ thường gặp với -able, -ive, -ful, -less, -ous hoặc -al. Nhiều trạng từ được tạo bằng cách thêm -ly vào tính từ. Cùng kết thúc bằng -al, arrival trong early arrival là danh từ, còn annual trong annual sales là tính từ. Xét cả cụm để quyết định.',
        examples: [{
          en: 'The early arrival of the replacement parts kept production on schedule.',
          vi: 'Việc phụ tùng thay thế đến sớm giúp sản xuất diễn ra đúng tiến độ.',
          why: 'Arrival gọi tên sự kiện đến nơi. Early mô tả thời điểm của sự kiện, còn the … of bao quanh cụm có danh từ chính.',
          quick: 'Với -al, hãy thử hỏi từ ấy gọi tên sự việc hay miêu tả một danh từ bên cạnh.'
        }]
      },
      {
        title: 'Nếu cùng là danh từ, kiểm tra đối tượng được nói đến',
        body: 'Một họ từ có thể có danh từ chỉ người, hành động, tài liệu hoặc sản phẩm. Applicant chỉ người nộp đơn, application có thể chỉ đơn hoặc việc nộp đơn. Động từ và những từ xung quanh giúp phân biệt các nghĩa này.',
        examples: [{
          en: 'The applicant brought a copy of her application to the interview.',
          vi: 'Ứng viên mang theo một bản sao hồ sơ ứng tuyển của mình đến buổi phỏng vấn.',
          why: 'Người có thể mang tài liệu là applicant. Thứ được sao thành bản là application.',
          quick: 'Ghép lần lượt với hành động gần nhất: người thì brought, hồ sơ thì có a copy of.'
        }]
      },
      {
        title: 'Một từ có thể giữ nhiều chức năng',
        body: 'Nhiều từ ngắn như work, plan, record có thể là danh từ hoặc động từ mà vẫn giữ nguyên hình thức. Từ đứng trước và vai trò của cả cụm giúp quyết định cách hiểu.',
        examples: [{
          en: 'Please record the date and keep a record of the payment.',
          vi: 'Vui lòng ghi lại ngày tháng và lưu hồ sơ về khoản thanh toán.',
          why: 'Record thứ nhất nêu hành động cần thực hiện trong câu yêu cầu. A record là cụm danh từ chỉ thứ cần lưu.',
          quick: 'So sánh record the date với a record of the payment. Mạo từ a xác định cách dùng thứ hai.'
        }]
      }
    ],
    questions: [
      {
        stem: 'The service team responded ___ to the urgent request.',
        options: ['promptness', 'prompt', 'promptly', 'prompting'], answer: 2,
        vi: 'Đội dịch vụ đã nhanh chóng phản hồi yêu cầu khẩn cấp.',
        reason: 'Chỗ trống nêu cách đội dịch vụ phản hồi, nên chọn trạng từ promptly.',
        quick: 'Đặt câu hỏi “phản hồi như thế nào?” rồi ghép responded promptly.',
        explain: ['Promptness là danh từ chỉ sự nhanh chóng.', 'Prompt có thể là tính từ hoặc động từ, nhưng ở đây cần trạng từ chỉ cách thức.', 'Promptly bổ nghĩa cho responded.', 'Prompting là dạng -ing của prompt, mang nghĩa thúc giục hoặc gợi ra và không hoàn chỉnh cụm này.']
      },
      {
        stem: 'The director gave her written ___ for the purchase.',
        options: ['approval', 'approve', 'approvingly', 'approved'], answer: 0,
        vi: 'Giám đốc đã phê duyệt việc mua hàng bằng văn bản.',
        reason: 'Her written ___ là cụm tân ngữ của gave. Written đã mô tả hình thức, nên vị trí cuối cụm cần danh từ approval.',
        quick: 'Nhận ra cụm give approval for và kiểm tra written approval có nghĩa “sự phê duyệt bằng văn bản”.',
        explain: ['Approval là danh từ chỉ sự phê duyệt.', 'Approve là động từ nguyên mẫu.', 'Approvingly là trạng từ chỉ thái độ tán thành.', 'Approved là phân từ hoặc dạng quá khứ, thiếu danh từ chính nếu đặt ở đây.']
      },
      {
        stem: 'Each ___ must bring photo identification to the interview.',
        options: ['applies', 'applicable', 'application', 'applicant'], answer: 3,
        vi: 'Mỗi ứng viên phải mang giấy tờ tùy thân có ảnh đến buổi phỏng vấn.',
        reason: 'Sau each cần danh từ số ít. Cả application và applicant đều đạt điều kiện hình thức, nhưng chỉ người mới tự mang giấy tờ đến phỏng vấn.',
        quick: 'Ghép hai danh từ còn lại với must bring photo identification.',
        explain: ['Applies là động từ chia ở ngôi thứ ba số ít.', 'Applicable là tính từ có nghĩa có thể áp dụng.', 'Application có thể chỉ hồ sơ, một hồ sơ không thể tự mang giấy tờ.', 'Applicant chỉ người dự tuyển, phù hợp với must bring.']
      },
      {
        stem: 'Only the laboratory supervisor is ___ to release the final results.',
        options: ['authority', 'authorized', 'authoritatively', 'authorization'], answer: 1,
        vi: 'Chỉ người phụ trách phòng thí nghiệm mới được phép công bố kết quả cuối cùng.',
        reason: 'Be authorized to do something nghĩa là được cấp quyền thực hiện việc gì. Người phụ trách là người nhận quyền công bố.',
        quick: 'Đọc cả hai phía is ___ to release, rồi hỏi ai được quyền làm việc này.',
        explain: ['Authority là danh từ chỉ thẩm quyền hoặc cơ quan có thẩm quyền, không khớp cấu trúc is ___ to release ở đây.', 'Authorized là phân từ trong be authorized to release.', 'Authoritatively là trạng từ chỉ cách nói hoặc làm một việc một cách có thẩm quyền.', 'Authorization gọi tên việc cấp phép, không mô tả người đã được cấp phép sau is.']
      }
    ]
  },
  {
    id: 'cum-danh-tu',
    stage: 'foundation',
    title: 'Danh từ và danh từ ghép',
    summary: 'Tìm từ chính trong cụm và nhận biết khi một danh từ đứng trước để phân loại danh từ khác.',
    rules: [
      {
        title: 'Tìm từ chính của cụm danh từ',
        body: 'Cụm danh từ có thể làm chủ ngữ, tân ngữ hoặc đứng sau giới từ. Mạo từ, từ sở hữu hay từ chỉ lượng có thể đứng cách danh từ chính bởi tính từ và trạng từ. Xét cả cụm để biết vị trí nào còn thiếu.',
        examples: [{
          en: 'The firm renewed its annual membership.',
          vi: 'Công ty đã gia hạn tư cách thành viên hằng năm.',
          why: 'Its xác định sự sở hữu, annual mô tả chu kỳ, membership là thứ được gia hạn. Cả cụm its annual membership là tân ngữ của renewed.',
          quick: 'Từ its, nhìn sang phải đến khi trả lời được câu hỏi “gia hạn cái gì?”.'
        }]
      },
      {
        title: 'Danh từ có thể bổ nghĩa cho danh từ',
        body: 'Trong cụm N + N, danh từ sau thường chỉ đối tượng chính, còn danh từ trước cho biết loại, công dụng hoặc lĩnh vực. Ví dụ, training room là một loại phòng. Nhiều cụm kinh doanh được dùng như đơn vị từ vựng cố định.',
        examples: [{
          en: 'Please place all expense reports on my desk.',
          vi: 'Vui lòng đặt tất cả các báo cáo chi phí lên bàn tôi.',
          why: 'Reports cho biết đây là các báo cáo. Expense nêu loại báo cáo và giữ dạng số ít trong cụm expense report.',
          quick: 'Đọc từ cuối sang trước về nghĩa: báo cáo gì? Báo cáo chi phí.'
        }]
      },
      {
        title: 'Kiểm tra số nhiều ở đúng thành phần',
        body: 'Với nhiều danh từ ghép mà từ chính ở cuối, khi nói về nhiều đối tượng, dấu số nhiều gắn với từ chính. Một số cụm có thành phần đầu cố định ở số nhiều như sales team hoặc customs officer, nên hãy ghi nhớ cả cụm.',
        examples: [{
          en: 'Two sales teams share the same meeting room.',
          vi: 'Hai nhóm bán hàng dùng chung một phòng họp.',
          why: 'Teams mang số nhiều vì có hai nhóm. Sales là thành phần cố định của cụm sales team.',
          quick: 'Hỏi “đếm cái gì?” trước khi chọn vị trí của -s.'
        }]
      },
      {
        title: 'Phân biệt sở hữu với phân loại',
        body: 'Danh từ chỉ người hoặc tổ chức có thể dùng sở hữu cách để cho biết vật thuộc về ai. Với danh từ số ít, dùng ’s. Với danh từ số nhiều đã có đuôi -s, đặt dấu nháy sau s. Danh từ số nhiều bất quy tắc như children dùng ’s (children’s books là sách dành cho trẻ em). Cụm danh từ ghép lại thường cho biết một vật thuộc loại gì.',
        examples: [{
          en: 'The manager’s office is next to the conference room.',
          vi: 'Phòng làm việc của quản lý nằm cạnh phòng hội nghị.',
          why: 'The manager’s office nêu người sử dụng văn phòng. Conference room xác định loại phòng theo công dụng.',
          quick: 'Thử hỏi “phòng của ai?” cho manager’s và “loại phòng gì?” cho conference.'
        }]
      }
    ],
    questions: [
      {
        stem: 'Several office ___ were delivered this morning.',
        options: ['chair', 'chairs', 'chairing', 'chaired'], answer: 1,
        vi: 'Một số ghế văn phòng đã được giao sáng nay.',
        reason: 'Trong office chairs, đối tượng được giao là ghế. Several và were đều phù hợp với danh từ chính số nhiều chairs.',
        quick: 'Bỏ office rồi đọc Several ___ were delivered.',
        explain: ['Chair ở số ít, không đi với several ở đây.', 'Chairs là danh từ chính số nhiều, office phân loại số ghế ấy.', 'Chairing là việc chủ trì, không chỉ những chiếc ghế được giao.', 'Chaired là động từ ở quá khứ hoặc phân từ, không thể làm danh từ chính của cụm.']
      },
      {
        stem: 'Guests can make a room ___ by calling the front desk.',
        options: ['reserve', 'reserved', 'reserves', 'reservation'], answer: 3,
        vi: 'Khách có thể đặt phòng bằng cách gọi cho quầy lễ tân.',
        reason: 'Make a reservation nghĩa là đặt chỗ. Room nêu loại chỗ được đặt, còn reservation là danh từ chính trong cụm room reservation.',
        quick: 'Đọc make a ___ và nhẩm “đặt chỗ”. Sau đó ghép lại room reservation.',
        explain: ['Reserve có thể chỉ nguồn dự trữ hoặc là động từ đặt trước; make a room reserve không phải cách diễn đạt việc đặt phòng.', 'Reserved là phân từ hoặc tính từ và không làm danh từ chính sau a room ở đây.', 'Reserves là dạng số nhiều hoặc động từ đã chia, không tạo cụm danh từ số ít sau a.', 'Reservation là danh từ thích hợp trong make a room reservation.']
      },
      {
        stem: 'Visitors need the finance director’s written ___ before entering the archive.',
        options: ['permitted', 'permissible', 'permission', 'permissibly'], answer: 2,
        vi: 'Khách cần có sự cho phép bằng văn bản của giám đốc tài chính trước khi vào kho lưu trữ.',
        reason: 'The finance director’s cho biết ai cấp phép. Written là từ bổ nghĩa, nên cụm còn thiếu danh từ chính permission.',
        quick: 'Tách director’s | written | ___ rồi hỏi “khách cần thứ gì?”.',
        explain: ['Permitted là dạng phân từ mang nghĩa được cho phép.', 'Permissible là tính từ chỉ điều có thể được chấp nhận.', 'Permission là danh từ chỉ sự cho phép, tạo cụm written permission.', 'Permissibly là trạng từ, không thể gọi tên thứ khách cần có.']
      },
      {
        stem: 'The three ___ shared recommendation was signed by all three of them.',
        options: ['consultants’', 'consultant’s', 'consults', 'consultant'], answer: 0,
        vi: 'Bản kiến nghị chung của ba chuyên gia tư vấn có chữ ký của cả ba người.',
        reason: 'Chỉ có một bản kiến nghị chung và nó thuộc về ba chuyên gia. Danh từ số nhiều consultants đã có -s nên dấu nháy đặt sau s.',
        quick: 'Ghép the three với consultants trước, sau đó thêm sở hữu cách để nối với shared recommendation.',
        explain: ['Consultants’ là sở hữu cách của nhiều chuyên gia tư vấn.', 'Consultant’s diễn đạt sở hữu của một chuyên gia và không đi với three.', 'Consults là một dạng của động từ consult hoặc danh từ trong một số ngữ cảnh, không biểu thị ba người sở hữu kiến nghị.', 'Consultant là danh từ số ít và thiếu dấu hiệu sở hữu cần có ở đây.']
      }
    ]
  },
  {
    id: 'tinh-tu',
    stage: 'foundation',
    title: 'Tính từ và động từ nối',
    summary: 'Xác định đối tượng được mô tả để phân biệt tính từ, trạng từ và các dạng -ing, -ed.',
    rules: [
      {
        title: 'Tính từ mô tả danh từ',
        body: 'Tính từ có thể đứng trước danh từ trong cụm hoặc theo sau động từ nối để mô tả chủ ngữ. Khi trước danh từ có nhiều chỗ để bổ nghĩa, hãy xem từ cần điền mô tả bản thân danh từ hay mức độ của một tính từ sẵn có.',
        examples: [{
          en: 'The company offers flexible hours to its staff.',
          vi: 'Công ty cho phép nhân viên làm việc theo giờ linh hoạt.',
          why: 'Flexible mô tả đặc điểm của giờ làm việc. Cả cụm flexible hours là tân ngữ của offers.',
          quick: 'Hỏi “giờ làm việc như thế nào?”. Nếu chỗ trống trả lời trực tiếp, hãy xét tính từ.'
        }]
      },
      {
        title: 'Động từ nối và động từ hành động',
        body: 'Be, seem, become, remain và một số cách dùng của look, feel, taste, smell nối chủ ngữ với một đặc điểm. Khi cùng từ đó diễn đạt hành động có chủ ý, trạng từ có thể cho biết cách hành động diễn ra.',
        examples: [{
          en: 'The fabric feels smooth, but the buyer still examines it carefully for defects.',
          vi: 'Vải có bề mặt mịn, nhưng người mua vẫn kiểm tra kỹ xem vải có lỗi hay không.',
          why: 'Smooth mô tả bề mặt vải trong feels smooth. Ở vế sau, carefully cho biết người mua kiểm tra vải kỹ đến mức nào.',
          quick: 'Nếu từ sau feel mô tả chủ ngữ thì xét tính từ. Ở vế có examines, đặt câu hỏi “kiểm tra như thế nào?” để nhận ra trạng từ.'
        }]
      },
      {
        title: 'Tính từ đứng sau tân ngữ',
        body: 'Trong một số cách dùng của make, keep và find, tính từ đứng sau tân ngữ để diễn tả trạng thái của tân ngữ. Cách dịch thường là “làm cho”, “giữ cho” hoặc “nhận thấy … có đặc điểm gì”.',
        examples: [{
          en: 'The instructions made the process clearer.',
          vi: 'Các hướng dẫn giúp quy trình trở nên rõ ràng hơn.',
          why: 'Clearer mô tả process sau tác động của instructions. Các hướng dẫn giúp cho chính quy trình rõ ràng hơn.',
          quick: 'Thử đọc “the process became clearer”. Nếu quan hệ nghĩa giữ nguyên, tính từ là bổ ngữ của tân ngữ.'
        }]
      },
      {
        title: 'Tính từ -ing và -ed',
        body: 'Với các động từ gây cảm xúc như interest, confuse, surprise, dạng -ing chỉ đặc điểm gây ra cảm xúc, còn -ed mô tả bên trải nghiệm cảm xúc. Với những động từ khác, phần nghĩa có thể là đang thực hiện hay đã nhận hành động, như rising costs và revised prices. Chọn theo nghĩa cụ thể.',
        examples: [{
          en: 'The unexpected fee was surprising, and the guests were surprised by it.',
          vi: 'Khoản phí ngoài dự kiến khiến các vị khách ngạc nhiên.',
          why: 'Khoản phí gây ra phản ứng nên dùng surprising. Khách trải nghiệm sự bất ngờ nên dùng surprised.',
          quick: 'Tự hỏi “điều gì gây ra cảm xúc, ai cảm thấy như vậy?”. Người kể chuyện cũng có thể là interesting nếu họ khiến người khác thấy thú vị.'
        }]
      }
    ],
    questions: [
      {
        stem: 'The revised application form is much ___ than the previous version.',
        options: ['simply', 'simplicity', 'simplify', 'simpler'], answer: 3,
        vi: 'Mẫu đơn đã sửa đơn giản hơn nhiều so với phiên bản trước.',
        reason: 'Chỗ trống mô tả form sau is. Than nêu đối tượng so sánh, nên simpler là dạng tính từ thích hợp.',
        quick: 'Ghép is ___ than rồi tìm tính từ so sánh.',
        explain: ['Simply là trạng từ, không thể mô tả form trong khung so sánh này.', 'Simplicity là danh từ nghĩa là sự đơn giản.', 'Simplify là động từ nghĩa là đơn giản hóa.', 'Simpler là dạng so sánh hơn của simple.']
      },
      {
        stem: 'Please keep the emergency exit ___ at all times.',
        options: ['accessible', 'accessibly', 'accessibility', 'accesses'], answer: 0,
        vi: 'Vui lòng luôn giữ cho lối thoát hiểm có thể sử dụng được.',
        reason: 'Keep + the emergency exit + tính từ diễn tả trạng thái cần duy trì của lối thoát hiểm.',
        quick: 'Thử The emergency exit must be ___ rồi điền accessible.',
        explain: ['Accessible mô tả trạng thái có thể tiếp cận hoặc sử dụng.', 'Accessibly là trạng từ, không nêu trạng thái của exit.', 'Accessibility là danh từ chỉ khả năng tiếp cận.', 'Accesses có thể là động từ chia; ở đây cụm đã có keep và cần bổ ngữ miêu tả.']
      },
      {
        stem: 'Many participants were ___ by the unexpected change of venue.',
        options: ['confusing', 'confused', 'confusion', 'confuse'], answer: 1,
        vi: 'Nhiều người tham gia cảm thấy bối rối vì địa điểm thay đổi bất ngờ.',
        reason: 'Người tham gia trải nghiệm cảm giác bối rối do việc đổi địa điểm gây ra. Were confused by diễn đạt đúng quan hệ này.',
        quick: 'Đọc by the unexpected change để nhận ra nguyên nhân và xác định ai chịu tác động.',
        explain: ['Confusing mô tả người hoặc điều khiến người khác bối rối, không khớp với by the change ở đây.', 'Confused diễn tả cảm giác của participants vì thay đổi bất ngờ.', 'Confusion là danh từ chỉ sự bối rối.', 'Confuse là nguyên mẫu, không thể theo were như trong câu này.']
      },
      {
        stem: 'The inspectors looked ___ at the joint that had begun to leak.',
        options: ['care', 'careful', 'carefully', 'carefulness'], answer: 2,
        vi: 'Các thanh tra quan sát kỹ mối nối đã bắt đầu rò rỉ.',
        reason: 'Look at the joint có nghĩa là quan sát mối nối. Từ cần điền diễn tả cách thanh tra quan sát, nên dùng trạng từ.',
        quick: 'Đọc qua chỗ trống đến at the joint. Look at nêu hành động có hướng nhìn cụ thể.',
        explain: ['Care là danh từ hoặc động từ, không cho biết cách nhìn ở vị trí này.', 'Careful có thể theo look khi look là động từ nối mô tả vẻ ngoài của chủ ngữ, nhưng look at là cụm động từ hành động, không phải động từ nối.', 'Carefully bổ nghĩa cho hành động looked at.', 'Carefulness là danh từ chỉ tính cẩn thận.']
      }
    ]
  },
  {
    id: 'trang-tu',
    stage: 'foundation',
    title: 'Trạng từ và vị trí bổ nghĩa',
    summary: 'Tìm đúng từ mà trạng từ bổ nghĩa, từ động từ chỉ hành động đến tính từ, trạng từ hoặc cả mệnh đề.',
    rules: [
      {
        title: 'Trạng từ cho biết cách thực hiện hành động',
        body: 'Trạng từ chỉ cách thức có thể đứng trước động từ chính hoặc sau cụm động từ và tân ngữ. Với động từ có tân ngữ, vị trí thông dụng là sau tân ngữ nếu trạng từ đặt ở cuối. Tìm hành động trước khi chọn dạng từ.',
        examples: [{
          en: 'The accountant checked the totals carefully.',
          vi: 'Kế toán viên đã kiểm tra kỹ các số liệu tổng cộng.',
          why: 'Carefully cho biết cách checked được thực hiện. The totals là tân ngữ của checked.',
          quick: 'Hỏi “kiểm tra như thế nào?”. Đừng để danh từ totals bên cạnh khiến bạn chọn tính từ.'
        }]
      },
      {
        title: 'Trạng từ có thể bổ nghĩa cho tính từ hoặc trạng từ khác',
        body: 'Một trạng từ chỉ mức độ có thể đứng ngay trước tính từ hoặc một trạng từ khác, chẳng hạn unusually quiet hoặc remarkably quickly. Trong cụm đứng trước danh từ, kiểm tra xem tính từ đã có sẵn hay chưa.',
        examples: [{
          en: 'The unusually clear instructions helped us start immediately.',
          vi: 'Nhờ hướng dẫn rõ ràng hơn hẳn thường lệ, chúng tôi có thể bắt tay vào việc ngay.',
          why: 'Clear đã mô tả instructions. Unusually bổ nghĩa cho clear và cho biết độ rõ ràng khác thường đến mức nào.',
          quick: 'Đọc từ phải sang trái: instructions thế nào? Clear. Clear ở mức nào? Unusually.'
        }, {
          en: 'The figures are clear enough to publish.',
          vi: 'Các số liệu đã đủ rõ ràng để công bố.',
          why: 'Enough chỉ mức độ và đứng sau tính từ clear. So sánh với enough information, trong đó enough đứng trước danh từ để chỉ lượng.',
          quick: 'Hỏi “đủ rõ” hay “đủ thông tin”? Với mức độ của tính từ, đọc clear enough theo cả cụm.'
        }]
      },
      {
        title: 'Tìm trạng từ trong cụm có trợ động từ',
        body: 'Trạng từ như already, recently, gradually hoặc carefully có thể xen giữa trợ động từ và thành phần chính. Trạng từ tần suất often, usually, rarely thường đứng trước động từ thường, sau be khi be là động từ chính, hoặc sau trợ động từ đầu tiên.',
        examples: [{
          en: 'The updated manual has already been sent to all branches.',
          vi: 'Bản cập nhật của sổ tay đã được gửi đến tất cả các chi nhánh.',
          why: 'Has been sent là cụm động từ bị động ở hiện tại hoàn thành. Already đứng sau has và cho biết việc gửi đã xảy ra.',
          quick: 'Tạm bỏ already để nhìn rõ has been sent. Sau đó kiểm tra sắc thái thời gian mà already bổ sung.'
        }]
      },
      {
        title: 'Kiểm tra nghĩa của các dạng có và không có -ly',
        body: 'Fast, hard, early, late có thể dùng như trạng từ. Dạng có -ly đôi khi mang nghĩa khác: hard là tích cực hoặc vất vả, hardly là hầu như không; late là muộn, lately là gần đây. Một số từ có -ly như friendly lại là tính từ.',
        examples: [{
          en: 'The team worked hard and hardly took a break.',
          vi: 'Cả nhóm làm việc chăm chỉ và hầu như không nghỉ.',
          why: 'Hard bổ nghĩa cho worked, diễn tả mức độ nỗ lực. Hardly đi với took a break để diễn đạt ý gần như phủ định.',
          quick: 'Thử thay bằng “chăm chỉ” và “hầu như không”. Chọn nghĩa làm cả câu hợp lý.'
        }]
      },
      {
        title: 'Trạng từ nhận xét cả mệnh đề',
        body: 'Một trạng từ như fortunately, unexpectedly hoặc unfortunately có thể thể hiện đánh giá của người nói về cả sự việc. Khi đứng đầu câu, nhóm này thường được ngăn cách bằng dấu phẩy.',
        examples: [{
          en: 'Fortunately, a technician was available that evening.',
          vi: 'May thay, tối hôm đó có một kỹ thuật viên sẵn sàng hỗ trợ.',
          why: 'Fortunately đánh giá việc có sẵn kỹ thuật viên là may mắn. Trạng từ này có phạm vi nghĩa bao trùm cả mệnh đề.',
          quick: 'Đọc phần sau dấu phẩy. Nếu nó đã là một câu đủ nghĩa, hãy xét từ mở đầu dùng để bình luận.'
        }]
      }
    ],
    questions: [
      {
        stem: 'The receptionist answered the caller’s questions ___.',
        options: ['patience', 'patient', 'patiently', 'patients'], answer: 2,
        vi: 'Nhân viên lễ tân đã kiên nhẫn trả lời các câu hỏi của người gọi.',
        reason: 'Answered đã có tân ngữ the caller’s questions. Chỗ trống ở cuối nêu cách trả lời, cần trạng từ patiently.',
        quick: 'Hỏi “trả lời như thế nào?” sau khi đọc hết tân ngữ.',
        explain: ['Patience là danh từ chỉ sự kiên nhẫn.', 'Patient có thể là tính từ chỉ người kiên nhẫn hoặc danh từ chỉ bệnh nhân.', 'Patiently mô tả cách lễ tân trả lời.', 'Patients là danh từ số nhiều chỉ các bệnh nhân.']
      },
      {
        stem: 'The report is ___ detailed for a one-page summary.',
        options: ['surprise', 'surprises', 'surprising', 'surprisingly'], answer: 3,
        vi: 'So với độ dài của một bản tóm tắt một trang, báo cáo này chi tiết đến bất ngờ.',
        reason: 'Detailed mô tả report sau is. Surprisingly bổ nghĩa cho detailed, cho biết mức độ chi tiết khiến người đọc bất ngờ.',
        quick: 'Ghép is ___ detailed rồi hỏi mức độ chi tiết gây ấn tượng thế nào.',
        explain: ['Surprise không bổ nghĩa cho mức độ detailed trong cấu trúc này.', 'Surprises là danh từ số nhiều hoặc động từ đã chia, không vừa vị trí.', 'Surprising mô tả một danh từ; ở đây cần từ nêu mức độ của detailed.', 'Surprisingly là trạng từ có thể bổ nghĩa cho tính từ detailed.']
      },
      {
        stem: 'Thanks to the new insulation, we can ___ hear the machinery from the office now; it is almost silent here.',
        options: ['hardly', 'hard', 'harder', 'hardest'], answer: 0,
        vi: 'Nhờ lớp cách âm mới, giờ chúng tôi hầu như không nghe thấy tiếng máy móc từ văn phòng, nơi này gần như yên tĩnh hoàn toàn.',
        reason: 'Almost silent cho thấy tiếng máy hầu như không nghe thấy. Hardly mang đúng nghĩa đó.',
        quick: 'Tìm cụm giải nghĩa lại ở cuối câu: almost silent.',
        explain: ['Hardly hear diễn đạt mức âm thanh rất khó nghe thấy.', 'Hard có thể là trạng từ như trong work hard, nhưng không có nghĩa “hầu như không”.', 'Harder là dạng so sánh hơn, không phù hợp với vị trí và ý giảm tiếng ồn.', 'Hardest là dạng so sánh nhất và không tạo cụm thích hợp ở đây.']
      },
      {
        stem: 'The company paid all ten invoices in full. ___, the outstanding balance on those invoices is zero.',
        options: ['Nevertheless', 'Consequently', 'Instead', 'Conversely'], answer: 1,
        vi: 'Công ty đã thanh toán đầy đủ cả mười hóa đơn. Vì vậy, số dư còn phải trả trên các hóa đơn đó bằng không.',
        reason: 'Cả bốn từ đều có thể dùng ở đầu câu. Số dư bằng không là kết quả trực tiếp của việc đã trả hết, nên consequently diễn đạt đúng quan hệ.',
        quick: 'Đọc hai cụm paid in full và balance … is zero. Quan hệ giữa chúng là nguyên nhân và kết quả.',
        explain: ['Nevertheless diễn tả ý nhượng bộ dù vậy, trong khi số dư bằng không là kết quả được dự đoán.', 'Consequently báo hiệu hệ quả của việc thanh toán đầy đủ.', 'Instead diễn tả sự thay thế và cần có một lựa chọn hoặc hành động khác để thay thế.', 'Conversely nêu quan hệ trái chiều, không đúng với việc số dư giảm về không sau thanh toán.']
      }
    ]
  }
]);
