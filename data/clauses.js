// Part 5 · Giới từ, từ nối và mệnh đề
{
  const example = (en, vi, why, quick) => ({ en, vi, why, quick });
  const rule = (title, body, ...examples) => ({ title, body, examples });
  const question = (stem, options, answer, vi, reason, quick, explain) =>
    ({ stem, options, answer, vi, reason, quick, explain });

  window.lessons.push(...[
    {
      id: 'gioi-tu', stage: 'clauses', title: 'Giới từ chỉ thời gian và nơi chốn',
      summary: 'Tìm mốc, khoảng thời gian hay hướng di chuyển rồi chọn giới từ diễn đạt đúng quan hệ.',
      rules: [
        rule('At, on và in với thời gian',
          'At thường đi với giờ hoặc thời điểm cụ thể. On đi với ngày, thứ, kể cả một buổi xác định bằng thứ hoặc ngày. In đi với tháng, năm và các buổi nói chung. Mốc nhỏ nhất cần diễn đạt sẽ quyết định cách chọn.',
          example('The briefing starts at nine on Monday morning.', 'Buổi phổ biến thông tin bắt đầu lúc chín giờ sáng thứ Hai.', 'At gắn với giờ nine. On gắn với cả cụm Monday morning, tức một buổi sáng xác định.', 'Tách câu bằng hai câu hỏi “Mấy giờ?” và “Vào ngày nào?”.')),
        rule('By và until diễn đạt hai loại mốc',
          'By nêu hạn chót để hoàn thành một việc, có thể hoàn thành sớm hơn. Until chỉ điểm cuối của trạng thái hoặc hoạt động kéo dài. Trong câu phủ định, not … until cho biết đến mốc đó sự việc mới xảy ra.',
          example('Submit the form by Friday. The portal will remain open until Friday.', 'Hãy nộp biểu mẫu chậm nhất vào thứ Sáu. Cổng thông tin sẽ mở đến thứ Sáu.', 'Submit là việc cần hoàn tất trước hạn. Remain open là trạng thái kéo dài tới mốc đó.', 'Hỏi “chậm nhất khi nào?” cho by và “kéo dài tới khi nào?” cho until.')),
        rule('During, for và since',
          'During đi với một giai đoạn hoặc sự kiện để cho biết khi nào việc gì xảy ra. For + khoảng thời gian cho biết bao lâu. Since + mốc cho biết thời điểm bắt đầu của một khoảng kéo dài đến mốc tham chiếu.',
          example('The network went offline for ten minutes during the inspection.', 'Mạng bị ngắt trong mười phút khi cuộc kiểm tra đang diễn ra.', 'Ten minutes trả lời “bao lâu”. The inspection cho biết sự cố xảy ra trong sự kiện nào.', 'Số đo thời lượng gợi for. Tên sự kiện gợi during.'),
          example('The office has used this system since 2022.', 'Văn phòng đã sử dụng hệ thống này từ năm 2022 đến nay.', 'Năm 2022 là điểm bắt đầu. Hiện tại hoàn thành liên kết việc sử dụng với hiện tại.', 'Phân biệt mốc 2022 với lượng thời gian four years.')),
        rule('Vị trí, đích đến và đường đi',
          'At định vị một điểm, in đặt vật trong một không gian, on chỉ bề mặt. To chỉ đích, into nhấn mạnh chuyển động vào bên trong, through chỉ đường đi xuyên qua. Chọn theo cách câu mô tả địa điểm.',
          example('Visitors wait at reception before walking through the security gate.', 'Khách chờ ở quầy lễ tân trước khi đi qua cổng an ninh.', 'Reception là điểm chờ. Cổng là nơi khách phải đi xuyên qua.', 'Tách vị trí đứng yên khỏi đường di chuyển.'))
      ],
      questions: [
        question('The technician tested the backup battery ___ three hours without a break.', ['since','during','for','by'], 2,
          'Kỹ thuật viên kiểm tra pin dự phòng liên tục trong ba giờ.', 'Three hours đo tổng thời lượng của lần kiểm tra.', 'Đặt câu hỏi “kiểm tra bao lâu?”',
          ['Since cần một điểm bắt đầu, chẳng hạn since noon.','During thường đi với giai đoạn hoặc sự kiện đã xác định như during the audit.','For + three hours cho biết thời lượng.','By đánh dấu hạn chót hoặc tác nhân trong câu bị động.']),
        question('The training session begins ___ Thursday morning.', ['in','at','of','on'], 3,
          'Buổi đào tạo bắt đầu vào sáng thứ Năm.', 'Thursday xác định cụ thể ngày của buổi sáng, nên dùng on Thursday morning.', 'Đọc luôn Thursday trước morning.',
          ['In the morning dùng khi nói chung về buổi sáng.','At phù hợp với giờ cụ thể như at nine.','Of biểu thị quan hệ giữa các danh từ ở những cấu trúc khác.','On đi với một buổi cụ thể khi có tên thứ.']),
        question('Staff must submit each claim no later than Friday. In other words, each claim is due ___ Friday.', ['by','throughout','until','since'], 0,
          'Nhân viên phải nộp từng yêu cầu chậm nhất vào thứ Sáu. Nói cách khác, hạn nộp mỗi yêu cầu là thứ Sáu.', 'No later than xác định hạn cuối để hoàn tất hành động nộp.', 'Thay no later than bằng by.',
          ['By Friday nghĩa là chậm nhất vào thứ Sáu.','Throughout diễn đạt việc kéo dài suốt một giai đoạn.','Until dùng cho trạng thái kéo dài tới mốc, chẳng hạn remain open until Friday.','Since lấy thứ Sáu làm điểm bắt đầu.']),
        question('Do not enter the clean room. Instead, slide the sample ___ the narrow slot in the door so the technician on the other side can collect it.', ['among','through','above','opposite'], 1,
          'Đừng vào phòng sạch. Hãy đẩy mẫu qua khe hẹp trên cửa để kỹ thuật viên ở phía bên kia có thể nhận mẫu.', 'Mẫu phải đi từ phía này sang phía bên kia qua một khe cửa. Through mô tả đúng đường đi.', 'Gạch chân slot và on the other side.',
          ['Among chỉ vị trí ở giữa một nhóm vật.','Through chỉ chuyển động xuyên qua khe.','Above chỉ vị trí bên trên mà không diễn tả chuyển động mẫu từ phía này qua phía kia.','Opposite diễn tả vị trí đối diện, thiếu ý chuyển mẫu qua khe.'])
      ]
    },
    {
      id:'lien-tu-tu-noi', stage:'clauses', title:'Liên từ, giới từ và trạng từ nối',
      summary:'Nhìn thành phần sau chỗ trống, sau đó đọc hai vế để xác định nguyên nhân, tương phản, điều kiện hoặc thời gian.',
      rules:[
        rule('Because và although so với because of và despite',
          'Because diễn đạt nguyên nhân và although diễn đạt nhượng bộ. Cả hai có thể mở một mệnh đề đầy đủ với chủ ngữ và động từ chia thì. Because of và despite thường dẫn một cụm danh từ hoặc cụm V-ing. Cần xét cả hình thức lẫn nghĩa.',
          example('Although the lift was out of service, the office stayed open.', 'Mặc dù thang máy ngừng hoạt động, văn phòng vẫn mở cửa.', 'The lift was out of service là một mệnh đề. Việc văn phòng vẫn mở thể hiện kết quả trái với điều dễ dự đoán.', 'Tìm chủ ngữ the lift và động từ was trước.'),
          example('The office stayed open despite the lift failure.', 'Văn phòng vẫn mở cửa dù thang máy bị hỏng.', 'The lift failure là cụm danh từ diễn đạt trở ngại.', 'Đổi the lift was out of service thành the lift failure thì từ dẫn cũng đổi.')),
        rule('While và during',
          'While có thể mở mệnh đề mô tả hai việc diễn ra cùng lúc hoặc đối chiếu hai sự việc. During là giới từ đi trước cụm danh từ chỉ giai đoạn. While + V-ing cũng dùng được trong mệnh đề rút gọn khi chủ thể phù hợp.',
          example('While the audit was under way, some files were unavailable.', 'Trong khi cuộc kiểm toán diễn ra, một số tệp tạm thời không truy cập được.', 'The audit was under way có cả chủ ngữ lẫn động từ. Nếu rút thành cụm the audit, có thể dùng during the audit.', 'Sau the audit còn was thì chọn cấu trúc mệnh đề.')),
        rule('However, therefore và otherwise',
          'Các trạng từ nối liên kết ý nghĩa giữa hai phát biểu. However báo hiệu tương phản, therefore nêu kết quả, otherwise nêu điều sẽ xảy ra nếu không làm theo điều vừa nói. Khi nối hai mệnh đề độc lập, có thể dùng dấu chấm hoặc chấm phẩy trước các trạng từ này.',
          example('The printer is out of ink. Therefore, all copies must be made upstairs.', 'Máy in đã hết mực. Vì vậy, mọi bản sao phải được in ở tầng trên.', 'Câu sau đưa ra cách xử lý do máy in hết mực. Therefore mở đầu một câu độc lập.', 'Đọc thử quan hệ “vì vậy”, rồi kiểm tra dấu câu.')),
        rule('Nếu, trừ khi và ngay khi',
          'If nêu điều kiện, unless có nghĩa “trừ khi”, còn once hoặc as soon as nêu thời điểm một việc kích hoạt việc sau. Trong mệnh đề điều kiện hoặc thời gian thông thường nói về tương lai, hiện tại đơn có thể diễn tả việc chưa xảy ra.',
          example('We will release the order once the payment clears.', 'Chúng tôi sẽ cho xuất đơn hàng ngay khi khoản thanh toán được xác nhận.', 'Once gắn thời điểm xuất đơn với lúc khoản tiền được xác nhận. Clears ở hiện tại đơn dù sự việc nằm trong tương lai.', 'Nếu có thể diễn đạt là “ngay khi”, hãy thử once.'))
      ],
      questions:[
        question('The delivery was postponed ___ a shortage of drivers.', ['although','because of','even though','whereas'], 1,
          'Chuyến giao hàng bị hoãn vì thiếu tài xế.', 'A shortage of drivers là cụm danh từ nêu nguyên nhân.', 'Tìm danh từ chính shortage và thử nghĩa “vì”.',
          ['Although nêu nhượng bộ và ở đây thiếu mệnh đề theo sau.','Because of đứng trước cụm danh từ nêu nguyên nhân.','Even though cần ý nhượng bộ, thường đi với mệnh đề.','Whereas đối chiếu hai mệnh đề.']),
        question('___ the package arrived a day late, its contents were still fresh.', ['Despite','During','Although','Because of'], 2,
          'Dù kiện hàng đến muộn một ngày, hàng bên trong vẫn tươi.', 'The package arrived là một mệnh đề. Still fresh nêu kết quả khác với điều người đọc có thể lo ngại.', 'Tìm arrived, rồi để ý still.',
          ['Despite cần cụm danh từ hoặc dạng tương đương.','During đi với cụm chỉ khoảng thời gian hoặc sự kiện.','Although dẫn mệnh đề nêu trở ngại nhưng kết quả vẫn tốt.','Because of cần cụm danh từ và diễn đạt nguyên nhân.']),
        question('Please renew your parking permit today. ___, your badge will stop opening the garage gate tomorrow.', ['Similarly','Meanwhile','For example','Otherwise'], 3,
          'Vui lòng gia hạn giấy phép đỗ xe hôm nay. Nếu không, từ ngày mai thẻ của bạn sẽ không mở được cổng gara.', 'Câu sau cho biết hậu quả nếu người nhận bỏ qua yêu cầu ở câu trước.', 'Thử thêm “nếu bạn không gia hạn”.',
          ['Similarly nối hai trường hợp tương tự.','Meanwhile chỉ việc diễn ra trong cùng khoảng thời gian.','For example giới thiệu một ví dụ về ý trước.','Otherwise báo hiệu hệ quả khi điều kiện vừa nêu không được đáp ứng.']),
        question('A refund will be issued automatically ___ the customer chooses store credit instead.', ['unless','despite','so that','as though'], 0,
          'Khoản tiền sẽ được tự động hoàn lại, trừ khi khách hàng chọn nhận tín dụng mua hàng thay thế.', 'Instead cho biết lựa chọn nhận tín dụng là ngoại lệ đối với cách hoàn tiền mặc định.', 'Tìm lựa chọn thay thế sau instead rồi thử “trừ khi”.',
          ['Unless mở mệnh đề chỉ ngoại lệ.','Despite không đứng trực tiếp trước mệnh đề the customer chooses ở đây.','So that nêu mục đích, không diễn đạt hai cách xử lý thay thế nhau.','As though diễn tả vẻ như một điều gì đó xảy ra.'])
      ]
    },
    {
      id:'menh-de-quan-he',stage:'clauses',title:'Mệnh đề quan hệ',
      summary:'Xác định danh từ được nói tới và thành phần còn thiếu trong mệnh đề theo sau.',
      rules:[
        rule('Who, whom, which và that',
          'Who thường chỉ người và có thể làm chủ ngữ hoặc tân ngữ. Whom là dạng tân ngữ chỉ người, rõ nhất ngay sau giới từ trong văn viết trang trọng. Which chỉ vật. Trong mệnh đề xác định, that có thể thay cho người hoặc vật ở vị trí chủ ngữ hay tân ngữ. Chỉ lược bỏ đại từ khi nó làm tân ngữ trong mệnh đề xác định và không đứng ngay sau giới từ.',
          example('The technician who reset the printer has left.', 'Kỹ thuật viên đã khởi động lại máy in đã ra về.', 'Trong who reset the printer, reset chưa có chủ ngữ nào khác. Who đảm nhiệm vị trí đó.', 'Tách vế ngắn “___ reset the printer”.'),
          example('The invoice the supplier sent was incorrect.', 'Hóa đơn nhà cung cấp gửi đến có sai sót.', 'Trong the supplier sent, nhà cung cấp là chủ ngữ, còn thứ được gửi chính là invoice. Đại từ làm tân ngữ đã được lược bỏ.', 'Thử chèn which giữa invoice và the supplier.')),
        rule('Whose đứng trước danh từ được sở hữu',
          'Whose + danh từ thể hiện quan hệ sở hữu hoặc liên hệ với danh từ đứng trước. Danh từ được liên hệ có thể chỉ người, động vật, tổ chức hoặc vật; với vật, whose thường gặp trong văn phong trang trọng. Cụm whose + danh từ có thể làm chủ ngữ hay tân ngữ trong mệnh đề.',
          example('We contacted the supplier whose invoice was incomplete.', 'Chúng tôi đã liên hệ với nhà cung cấp có hóa đơn chưa đầy đủ.', 'Hóa đơn thuộc về nhà cung cấp. Whose invoice là chủ ngữ của was incomplete.', 'Diễn đạt lại thành the supplier’s invoice.')),
        rule('Dấu phẩy và giới từ trước đại từ',
          'Mệnh đề chen giữa dấu phẩy bổ sung thông tin cho danh từ đã xác định. Dùng who, whom, whose hoặc which tùy chức năng. Khi giới từ đứng ngay trước đại từ, văn viết dùng whom cho người và which cho vật. That không đứng ngay sau giới từ hay mở mệnh đề bổ sung có dấu phẩy.',
          example('The room in which the panel meets is on the top floor.', 'Căn phòng nơi hội đồng họp nằm ở tầng trên cùng.', 'Cụm gốc là the panel meets in the room. Khi chuyển in lên trước, dùng in which cho địa điểm.', 'Khôi phục giới từ trong câu gốc meet in a room.')),
        rule('Where khác which ở chức năng',
          'Where chỉ nơi diễn ra sự việc, có thể tương đương in/at which. Which có thể thay một danh từ làm chủ ngữ hoặc tân ngữ. Cùng một danh từ chỉ nơi chốn vẫn có thể đi với which khi việc phía sau cần tân ngữ.',
          example('This is the depot where we work. It is also the depot which we manage.', 'Đây là kho nơi chúng tôi làm việc. Đó cũng là kho do chúng tôi quản lý.', 'Work dùng với địa điểm qua at/in. Manage lấy the depot làm tân ngữ trực tiếp.', 'Hỏi “làm việc ở đâu?” nhưng “quản lý cái gì?”.'))
      ],
      questions:[
        question('The engineer ___ designed the new lift is speaking today.', ['whom','who','whose','what'], 1,
          'Kỹ sư đã thiết kế thang máy mới sẽ phát biểu hôm nay.', 'Designed the new lift cần chủ ngữ chỉ người, thay cho the engineer.', 'Hỏi “ai thiết kế?”',
          ['Whom giữ vai trò tân ngữ.','Who là chủ ngữ của designed.','Whose cần một danh từ đi theo để tạo quan hệ sở hữu.','What không dùng sau tiền ngữ the engineer theo cấu trúc này.']),
        question('The agency selected a designer ___ portfolio included several hospital projects.', ['who','whom','which','whose'], 3,
          'Cơ quan đã chọn một nhà thiết kế có hồ sơ năng lực gồm nhiều dự án bệnh viện.', 'Portfolio thuộc về nhà thiết kế. Whose portfolio làm chủ ngữ của included.', 'Thử thay bằng the designer’s portfolio.',
          ['Who sẽ để portfolio đứng cạnh một chủ ngữ khác mà thiếu liên kết.','Whom là tân ngữ, không thể hiện sở hữu.','Which không đứng trước portfolio để chỉ chủ sở hữu trong cấu trúc này.','Whose thể hiện quan hệ giữa nhà thiết kế và hồ sơ năng lực.']),
        question('The regional office, ___ opened last spring, now employs forty people.', ['which','that','where','whom'], 0,
          'Văn phòng khu vực, khai trương vào mùa xuân năm ngoái, hiện có bốn mươi nhân viên.', 'Mệnh đề chen giữa hai dấu phẩy thiếu chủ ngữ cho opened. Which thay the regional office.', 'Đọc riêng “___ opened last spring” và nhìn hai dấu phẩy.',
          ['Which làm chủ ngữ chỉ vật trong mệnh đề bổ sung.','That không mở mệnh đề quan hệ bổ sung giữa hai dấu phẩy.','Where biểu thị nơi chốn, nhưng opened ở đây cần chủ ngữ.','Whom chỉ người và làm tân ngữ.']),
        question('The consultant to ___ the board addressed its questions requested one more day to respond.', ['which','whose','whom','that'], 2,
          'Vị cố vấn mà hội đồng gửi câu hỏi đến đã xin thêm một ngày để phản hồi.', 'Khôi phục cấu trúc the board addressed its questions to the consultant. Sau to và thay người, dùng whom.', 'Giữ nguyên giới từ to và thay the consultant bằng whom.',
          ['Which chỉ vật ở vị trí này.','Whose cần một danh từ được sở hữu và không làm tân ngữ của to ở đây.','Whom làm tân ngữ chỉ người ngay sau giới từ to.','That không đi ngay sau giới từ đã được đưa lên đầu mệnh đề.'])
      ]
    },
    {
      id:'menh-de-rut-gon',stage:'clauses',title:'Rút gọn mệnh đề và phân từ',
      summary:'Gắn cụm V-ing hoặc V3 với đúng người hay vật, rồi kiểm tra ai thực hiện hành động.',
      rules:[
        rule('V-ing sau danh từ khi danh từ thực hiện hành động',
          'Cụm hiện tại phân từ có thể bổ nghĩa cho danh từ khi danh từ là chủ thể thực hiện hành động. Thử mở rộng thành mệnh đề quan hệ với một động từ thích hợp. Dạng -ing ở đây không tự xác định thì của cả câu.',
          example('Guests attending the workshop should sign in.', 'Khách tham dự hội thảo nên đăng ký có mặt.', 'Guests là những người thực hiện hành động attend. Cụm attending the workshop làm rõ nhóm khách nào.', 'Mở rộng thành guests who are attending the workshop.')),
        rule('V3 sau danh từ khi danh từ nhận tác động',
          'Phân từ quá khứ của ngoại động từ có thể diễn đạt nghĩa bị động khi bổ nghĩa cho danh từ. Cụm này có thể có by + tác nhân hoặc một bổ ngữ khác. Thiếu by vẫn có thể là bị động.',
          example('Guests invited to the workshop should confirm by noon.', 'Khách được mời dự hội thảo nên xác nhận trước hoặc vào lúc mười hai giờ trưa.', 'Guests nhận lời mời, nên invited có thể mở rộng thành who were invited. Đối chiếu với attending ở ví dụ trên.', 'Thử nói “ai đó mời khách” rồi kiểm tra người nhận tác động.')),
        rule('Cụm đầu câu gắn với chủ ngữ của mệnh đề chính',
          'Ở kiểu câu này, chủ thể ngầm của cụm phân từ đầu câu phải phù hợp với chủ ngữ mệnh đề chính. While + V-ing diễn tả hai việc cùng lúc. When/once + V3 có thể rút từ một mệnh đề bị động. Having + V3 diễn tả việc chủ thể đã hoàn tất trước hành động chính.',
          example('While reviewing the draft, Hana spotted a missing figure.', 'Khi xem lại bản thảo, Hana nhận thấy thiếu một con số.', 'Hana vừa xem bản thảo vừa phát hiện chỗ thiếu. Chủ thể của reviewing chính là Hana.', 'Đọc chủ ngữ ngay sau dấu phẩy rồi ghép lại với reviewing.'),
          example('Once approved, the designs can be sent to the builder.', 'Sau khi được phê duyệt, các bản thiết kế có thể được gửi cho đơn vị thi công.', 'Chủ ngữ the designs nhận hành động phê duyệt. Once approved tương đương once they are approved.', 'Đặt câu hỏi “cái gì được duyệt?”.'),
          example('Having checked the totals, Leo signed the report.', 'Sau khi đã kiểm tra các số liệu tổng cộng, Leo ký báo cáo.', 'Leo hoàn tất việc kiểm tra rồi mới ký. Having checked đánh dấu hành động có trước.', 'Xác định ai làm cả hai việc và việc nào xong trước.'))
      ],
      questions:[
        question('Visitors ___ for the shuttle can take a seat in the lobby.', ['waited','waits','to be waited','waiting'], 3,
          'Những vị khách đang chờ xe đưa đón có thể ngồi ở sảnh.', 'Visitors thực hiện hành động wait for. Can take là động từ chính. Waiting for the shuttle bổ nghĩa cho visitors.', 'Thử mở rộng thành visitors who are waiting.',
          ['Waited không kết hợp thành cụm bị động với for the shuttle theo nghĩa này.','Waits là dạng ngôi ba số ít và tạo thêm một động từ chia thì không được nối.','To be waited đặt khách vào vai nhận hành động không phù hợp.','Waiting tạo cụm chủ động mô tả nhóm khách.']),
        question('Only invoices ___ by the finance director are eligible for payment.', ['approving','approved','approve','approves'], 1,
          'Chỉ những hóa đơn được giám đốc tài chính phê duyệt mới đủ điều kiện thanh toán.', 'Invoices là đối tượng được duyệt. By the finance director nêu người duyệt.', 'Khôi phục invoices that were approved.',
          ['Approving đặt hóa đơn vào vai người duyệt.','Approved rút gọn mệnh đề bị động.','Approve là dạng động từ chưa tạo được cụm bổ nghĩa phù hợp trước are.','Approves là động từ số ít và không thể nối thẳng với vị ngữ are eligible.']),
        question('While ___ a customer’s application, Jo noticed that one page was missing.', ['reviewed','reviews','reviewing','review'], 2,
          'Trong khi xem xét hồ sơ của một khách hàng, Jo phát hiện thiếu một trang.', 'Jo thực hiện hành động review và application là tân ngữ. While reviewing tương đương while Jo was reviewing.', 'Ghép chủ ngữ sau dấu phẩy với động từ trước nó.',
          ['Reviewed mang nghĩa bị động nếu dùng như phân từ, không diễn đạt Jo xem hồ sơ.','Reviews cần chủ ngữ hiển ngôn trong mệnh đề này.','Reviewing tạo cụm chỉ hành động Jo đang thực hiện.','Review không tạo được cụm rút gọn sau while trong câu này.']),
        question('The chairs ___ to the volunteers by the event manager must be returned to the hall after the ceremony.', ['lent','lending','were lent','lend'], 0,
          'Những chiếc ghế được người quản lý sự kiện cho các tình nguyện viên mượn phải được trả về hội trường sau buổi lễ.', 'Ghế là vật được đem cho mượn. Must be returned đã là vị ngữ chính. Có thể mở rộng thành chairs that were lent to the volunteers.', 'Nhìn cả must be returned và tác nhân by the event manager.',
          ['Lent là V3 của lend và tạo cụm bị động bổ nghĩa cho chairs.','Lending biến chairs thành chủ thể cho người khác mượn đồ.','Were lent tạo thêm vị ngữ chia thì thiếu từ nối hoặc đại từ quan hệ.','Lend vừa sai vai trò chủ động vừa không tạo được cụm bổ nghĩa cho chairs.'])
      ]
    },
    {
      id:'cau-truc-song-song',stage:'clauses',title:'Cấu trúc song song và liên từ đi theo cặp',
      summary:'Ghép những thành phần có cùng chức năng, đặc biệt khi chỗ trống nằm ở vế thứ hai.',
      rules:[
        rule('Danh sách các hành động hoặc đặc điểm',
          'Khi nhiều thành phần cùng phụ thuộc vào một động từ hoặc một giới từ, duy trì cấu trúc tương ứng để câu dễ hiểu. Có thể dùng chung một động từ khuyết thiếu, một to hoặc một giới từ cho cả danh sách. Hãy xác định từ nào chi phối danh sách trước khi so hình thức các vế.',
          example('The team agreed to inspect the roof, photograph the damage, and submit a report.', 'Nhóm đồng ý kiểm tra mái nhà, chụp ảnh chỗ hư hại và nộp báo cáo.', 'To đứng trước inspect và dùng chung cho ba động từ nguyên mẫu. Submit đứng ngang hàng với inspect và photograph.', 'Đọc lại thành to inspect, to photograph, to submit.')),
        rule('Both … and, either … or, neither … nor',
          'Both … and gộp cả hai, either … or nêu hai khả năng lựa chọn, neither … nor phủ định cả hai. Đặt hai thành phần cùng chức năng sau hai nửa của cặp. Khi cả hai là chủ ngữ nối bằng both … and, thông thường dùng động từ số nhiều.',
          example('Guests may either collect a badge at reception or print one at home.', 'Khách có thể nhận thẻ tại quầy lễ tân hoặc tự in thẻ ở nhà.', 'Either và or dẫn hai cụm động từ collect a badge và print one, cùng chịu sự chi phối của may.', 'Đánh dấu động từ đầu mỗi nhánh là collect và print.'),
          example('Neither the printer nor the scanner is working.', 'Cả máy in lẫn máy quét đều đang hỏng.', 'Neither … nor phủ định cả hai thiết bị. Hai danh từ đều ở số ít nên is phù hợp.', 'Gặp neither thì kiểm tra nor ở vế sau.')),
        rule('Not only … but also và phạm vi của cặp',
          'Not only … but also bổ sung một đặc điểm hoặc hành động thứ hai. Đặt not only ngay trước thành phần thứ nhất để phần sau but also tương ứng về chức năng. Khi not only đưa lên đầu một mệnh đề nhằm nhấn mạnh, có đảo trợ động từ trước chủ ngữ trong mệnh đề đó.',
          example('The update not only blocks spam but also flags suspicious links.', 'Bản cập nhật không chỉ chặn thư rác mà còn đánh dấu các liên kết đáng ngờ.', 'Blocks và flags là hai động từ chia theo chủ ngữ số ít the update. Not only đứng trước blocks.', 'Bỏ hai cụm nối rồi đọc the update blocks … and flags ….'),
          example('Not only did the team finish early, but it also came in under budget.', 'Nhóm không chỉ hoàn thành sớm mà còn chi ít hơn mức ngân sách.', 'Vế đầu bắt đầu bằng not only nên dùng did the team finish. Vế kế giữ trật tự thông thường.', 'Phân biệt not only đầu mệnh đề với not only sau chủ ngữ.'))
      ],
      questions:[
        question('Both the gym ___ the swimming pool are included in the membership.', ['or','and','nor','but'], 1,
          'Gói hội viên bao gồm quyền sử dụng cả phòng tập lẫn hồ bơi.', 'Both ghép hai cơ sở vật chất đều có trong gói hội viên.', 'Đọc trọn cặp both … and.',
          ['Or kết hợp với either để nêu lựa chọn.','And hoàn tất cặp both … and.','Nor thường đi với neither.','But diễn đạt sự đối lập và không hoàn tất cặp both … and.']),
        question('Employees may either reserve a desk online ___ book one at reception.', ['yet','so','or','nor'], 2,
          'Nhân viên có thể đặt bàn làm việc trực tuyến hoặc đặt tại quầy lễ tân.', 'Hai cụm reserve a desk và book one là hai lựa chọn được either giới thiệu.', 'Nhận ra either trước reserve.',
          ['Yet diễn tả tương phản.','So nêu hệ quả.','Or mở nhánh lựa chọn thứ hai sau either.','Nor đi với neither trong câu phủ định cả hai lựa chọn.']),
        question('The workshop focuses on setting priorities, managing interruptions, and ___ realistic goals.', ['to establish','established','establishes','establishing'], 3,
          'Buổi hội thảo tập trung vào việc xác định thứ tự ưu tiên, xử lý những gián đoạn và đặt ra các mục tiêu thực tế.', 'On dùng chung cho ba cụm V-ing. Establishing đứng ngang hàng với setting và managing.', 'Đọc riêng focuses on ___ realistic goals.',
          ['To establish là nguyên mẫu có to, không theo mẫu on + V-ing ở đây.','Established là dạng quá khứ hoặc phân từ quá khứ, không tạo mục thứ ba cùng chức năng.','Establishes là động từ chia thì, không đặt được sau on.','Establishing tạo cụm V-ing song song với hai hoạt động trước.']),
        question('Not only ___ the backlog yesterday, but they also trained two new staff members.', ['did the clerks clear','the clerks cleared','did the clerks cleared','the clerks to clear'], 0,
          'Hôm qua, các nhân viên không chỉ giải quyết hết công việc tồn đọng mà còn đào tạo hai nhân viên mới.', 'Not only đặt đầu mệnh đề cần đảo trợ động từ. Yesterday và trained định vị ở quá khứ, nên dùng did + chủ ngữ + clear.', 'Tìm đầu mệnh đề Not only rồi kiểm tra did + động từ nguyên mẫu.',
          ['Did the clerks clear có đảo ngữ đúng và diễn đạt hành động hoàn tất.','The clerks cleared dùng trật tự khẳng định thông thường, thiếu đảo ngữ sau Not only đầu mệnh đề.','Did the clerks cleared dùng sai dạng sau did. Động từ chính phải ở nguyên mẫu.','The clerks to clear thiếu động từ chia thì và trợ động từ đảo lên trước.'])
      ]
    }
  ]);
}
