# Kế hoạch nâng cấp portfolio — Full-stack Developer

Ngày: 12/10/2026. Trạng thái: đã triển khai bản đầu trong repository theo yêu cầu người dùng; chưa commit/push.

## Bản triển khai ngày 12/10/2026

Cập nhật theo yêu cầu tiếp theo: toàn bộ nội dung hiển thị bằng tiếng Anh; “Giỏi” được dịch thành “Very Good classification”. Giao diện được thiết kế lại với navy/cobalt, font Manrope local, hero mới và project card dạng ngang xen kẽ. CV đổi tên thành `Ha-Quang-Huy-Full-Stack-Developer-CV.pdf`; các đường dẫn và kiểm tra đã cập nhật, nội dung PDF giữ nguyên. Bản cập nhật vượt qua 22 kiểm tra trình duyệt trên 3 trang và 5 kích thước màn hình.

- Website tĩnh dùng HTML/CSS/JavaScript, không yêu cầu build, framework hoặc CDN để hiển thị nội dung.
- Trang chính thể hiện Full-stack Developer, kinh nghiệm XEPO part-time / NETVIET full-time, 4 sản phẩm, kỹ năng, học vấn loại Giỏi và đóng góp nghiên cứu.
- Hai case study: `projects/bluexhome.html`, `projects/love-pdf.html`; ghi rõ vai trò full-stack trong nhóm 3 người.
- CV đã thêm ở `assets/Ha-Quang-Huy-Full-Stack-Developer-CV.pdf`, giữ nguyên byte so với file người dùng cung cấp. Chức danh trong CV gốc vẫn là Backend Developer; website dùng Full-stack theo yêu cầu người dùng.
- Hình ảnh dự án là đồ họa minh họa, chưa phải screenshot sản phẩm. Stack backend NETVIET và module cá nhân chưa xác nhận không được tự suy đoán.
- Kiểm tra: 2 bài kiểm tra static hosting đạt; JavaScript syntax và `git diff --check` đạt; 22 kiểm tra Chrome headless đạt với 3 trang ở 375, 540, 768, 1024, 1440px, menu, Escape, điều hướng Contact, lưu theme qua trang/reload, tắt JavaScript, storage bị chặn, reduced motion và tải PDF. Không có lỗi browser trong lần kiểm tra này.
- Đã kiểm tra ảnh render desktop/mobile và sửa tương phản chữ trong minh họa PDF ở dark mode.
- Chưa đo Lighthouse, chưa kiểm tra Pages sau xuất bản; chưa tạo sitemap/canonical khi chưa xác nhận domain/hosting đích.
- Giữ nguyên file xác minh Google và các ảnh cũ. README hướng dẫn chạy local, kiểm tra và publish từ root repository hiện có.

## 1. Mục tiêu và định vị

Portfolio phục vụ ứng tuyển Junior Full-stack Developer cho người mới tốt nghiệp có 1 năm kinh nghiệm. Nhà tuyển dụng cần nhanh chóng nhận ra vị trí ứng tuyển, kinh nghiệm, công nghệ chính, phần việc cá nhân và cách xem CV/liên hệ.

Định vị: Ha Quang Huy — Full-stack Developer có thế mạnh Backend, tốt nghiệp loại Giỏi. Trọng tâm là kinh nghiệm Node.js/NestJS, React, phát triển API và làm việc với dữ liệu; React Native là năng lực bổ trợ.

Không suy ra đã có kinh nghiệm React web từ React Native. Chỉ giới thiệu React web, TypeScript, Express, MongoDB hoặc những kỹ năng khác ở mức độ đã dùng thực tế và có thể giải thích trong phỏng vấn.

Nội dung chính dùng tiếng Anh, được viết đơn giản, tự nhiên. CV và website thống nhất chức danh, thời gian và thông tin liên hệ. Bản tiếng Việt là hạng mục sau nếu có nhu cầu.

## 2. Hiện trạng đã kiểm tra

- Website tĩnh: `index.html`, `style.css`, `img/`; chưa có cấu hình package/build trong project.
- HTML dùng Tailwind qua CDN, Font Awesome, CSS và JavaScript inline.
- Đã có hero, education, skills, projects, interests, footer, menu mobile và chuyển theme.
- Có hai dự án: App Mobile và Coffee App. Nội dung hiện tại liệt kê MongoDB, Express, TypeScript, Node.js; Coffee App thêm React Native/Expo.
- Chưa có mục Work Experience và nút tải CV.
- Education đứng trước Projects; phần học vấn và sở thích chiếm nhiều không gian so với bằng chứng làm việc.
- Dự án chưa nêu vai trò, thời gian, quy mô nhóm, đóng góp cá nhân, quyết định kỹ thuật và kết quả.
- Có link `#contact` nhưng không có phần tử với ID tương ứng.
- Số điện thoại hiển thị khác số trong URL Zalo; cần xác minh số đúng.
- `style.css` có cả thẻ HTML và script, không phải stylesheet thuần; HTML hiện không liên kết file này.
- Các khối `.section` mặc định ẩn và phụ thuộc JavaScript để hiện nội dung.
- Bài nghiên cứu hiện được mô tả là tài liệu tham khảo, không phải công trình cá nhân.
- README rất ngắn; chưa thấy meta description/Open Graph trong HTML.

Đánh giá này dựa trên mã nguồn local; chưa xác minh nội dung các repository dự án, link bên ngoài hoặc giao diện đang chạy trên trình duyệt.

## 3. Ba phương án

| Phương án | Công việc | Ưu điểm | Đánh đổi |
| --- | --- | --- | --- |
| A. Chỉnh nội dung trên giao diện hiện tại | Thêm kinh nghiệm, CV, sửa dự án và liên hệ | Nhanh, ít thay đổi | Bố cục và hình ảnh vẫn gần bản cũ |
| B. Thiết kế lại trên website tĩnh — đề xuất | Nội dung mới, hệ thống giao diện mới, CSS/JS tách riêng, hai case study | Phạm vi vừa phải, dễ bảo trì, tập trung vào hồ sơ | Cần chuẩn bị nội dung và ảnh dự án |
| C. Chuyển sang React và bổ sung chức năng | Component, routing và có thể có backend | Hợp khi muốn mở rộng thành sản phẩm | Tăng thời gian và vận hành; riêng việc đổi stack chưa chứng minh kinh nghiệm |

Đề xuất B cho bản đầu. CV đã cung cấp hai sản phẩm web tại NETVIET, nên ưu tiên trình bày kinh nghiệm này thay vì bổ sung một dự án React web mới chỉ để lấp khoảng trống hồ sơ.

## 4. Bố cục và nội dung

### Hero

- Họ tên, chức danh Full-stack Developer, địa điểm.
- Hai câu giới thiệu: loại sản phẩm đã xây, công nghệ thực sự dùng và kinh nghiệm thực tế.
- Có thể dùng “1+ year of professional experience”, kèm timeline ghi rõ part-time tại XEPO và full-time tại NETVIET; không diễn đạt thành hơn một năm kinh nghiệm full-time.
- CTA: View Projects, Download CV; email và GitHub dễ tìm.
- Ảnh chân dung rõ nét, crop giữ tỷ lệ; trạng thái tìm việc chỉ hiển thị nếu đúng.

### Work Experience

- Mỗi vị trí gồm công ty hoặc khách hàng, chức danh, loại hình công việc và tháng/năm bắt đầu–kết thúc.
- Ba đến năm bullet cho một vị trí: phần việc, cách thực hiện, kết quả có thể kiểm chứng.
- Thể hiện kinh nghiệm frontend, backend, teamwork/code review và triển khai nếu đã làm.
- Phân biệt internship, part-time, freelance và full-time; thời gian trùng nhau không cộng thành kinh nghiệm dài hơn.
- Không công khai tên khách hàng hoặc tài liệu nội bộ nếu chưa được phép; dùng mô tả đã ẩn danh khi cần.

### Selected Projects

Ưu tiên BlueXHome và Love PDF làm hai case study nổi bật. Mỗi dự án được thực hiện tại NETVIET trong nhóm 3 người, Huy đóng góp cả frontend và backend. Mỗi card gồm tên cụ thể, bài toán, ảnh sản phẩm, vai trò, stack và link Read Case Study/GitHub/Demo tùy tài nguyên thực tế. Các số liệu trong CV cần giữ đúng ý nghĩa: “designed to support 100+ users” không đồng nghĩa đã có 100+ người dùng thực tế.

Tea Milk App và HUYTICHXANH là dự án bổ sung theo CV. Không mặc định App Mobile trong website cũ chính là HUYTICHXANH vì đường dẫn repository khác nhau; cập nhật theo tên và repo trong CV sau khi kiểm tra.

Hai trang case study trình bày theo cùng một cấu trúc:

1. Bài toán và người sử dụng.
2. Loại dự án, thời gian, vai trò, quy mô nhóm.
3. Phần cá nhân trực tiếp thực hiện; phân biệt với chức năng do thành viên khác làm.
4. Giao diện và các trạng thái loading, empty, error nếu có.
5. API, xác thực/phân quyền, validation và mô hình dữ liệu thực tế.
6. Sơ đồ frontend/mobile → API → database; dịch vụ bên ngoài chỉ thêm khi đã dùng.
7. Một hoặc hai quyết định kỹ thuật và lý do lựa chọn.
8. Một vấn đề gặp phải, cách chẩn đoán và cách giải quyết.
9. Kết quả: demo, screenshot, chức năng đã hoàn thành hoặc số liệu có bằng chứng.
10. Giới hạn và bước cải tiến tiếp theo.

Không mặc định tính năng thanh toán là tích hợp thật hoặc ứng dụng đã lên store. Phân biệt dữ liệu mẫu, sandbox và môi trường thực tế. Repo riêng tư có thể dùng video và mô tả đã ẩn thông tin nhạy cảm.

### Technical Skills

- Frontend: công nghệ web đã trực tiếp dùng; mô tả ngắn năng lực responsive, forms, state hoặc API integration theo thực tế.
- Backend: Node.js/Express hoặc stack thực tế; API, authentication, validation, error handling khi có bằng chứng.
- Database: MongoDB/SQL và những thao tác đã làm như thiết kế schema, truy vấn hoặc index.
- Workflow: Git, review, testing, triển khai theo kinh nghiệm xác nhận.
- Mobile: React Native/Expo ở nhóm bổ trợ.
- Bỏ các kỹ năng ít liên quan hoặc chưa thể trao đổi sâu; không dùng điểm phần trăm tự chấm.

### About & Education

- About khoảng 80–120 từ: cách làm việc, điều học được từ năm kinh nghiệm và hướng phát triển.
- Education gọn: Greenwich Viet Nam, 2022–2026, đã tốt nghiệp loại Giỏi. Không tự quy đổi “loại Giỏi” thành GPA hoặc phân hạng bằng quốc tế khi chưa có thông tin tương ứng.
- Chứng chỉ ưu tiên theo mức liên quan với vị trí Full-stack.
- Thêm Research Contribution: tham gia lập trình và báo cáo kết quả cho người hướng dẫn trong nghiên cứu “Unsupervised industrial anomaly detection using paired well-lit and low-light images”. Người dùng đã xác nhận vai trò; chưa xác nhận tư cách tác giả, nên không gắn nhãn tác giả/đồng tác giả hoặc tự mô tả phần mô hình, thí nghiệm cụ thể.
- Sở thích gọn, chỉ giữ nội dung giúp hiểu thêm về ứng viên.

### Contact & Footer

- Email, GitHub, CV và LinkedIn nếu có hồ sơ thật; mạng xã hội cá nhân là tùy chọn.
- Dùng duy nhất `#contact` cho điều hướng tới phần liên hệ.
- Email dùng `mailto:`, điện thoại dùng `tel:` khi công khai; xác minh số Zalo.
- Bản đầu dùng liên hệ trực tiếp. Form gửi tin nhắn chỉ đưa vào khi có nhu cầu và cơ chế gửi thực tế.

## 5. Hướng thiết kế

- Nền sáng, chữ tối, một màu nhấn xanh; dark mode là tùy chọn đã có nên cân nhắc giữ sau khi kiểm tra cả hai theme.
- Typography tối đa hai font, khoảng trắng rộng, nội dung giới hạn chiều ngang để dễ đọc.
- Hero hai cột trên desktop; một cột trên mobile. Ảnh không lấn át chức danh và CTA.
- Kinh nghiệm dùng timeline gọn; dự án dùng card ảnh sản phẩm và đoạn tóm tắt rõ ràng.
- Tránh quá nhiều badge nhiều màu, shadow đậm hoặc animation kéo dài.
- Hover/focus nhẹ, menu mobile rõ ràng, giảm chuyển động theo thiết lập hệ thống.
- Mục tiêu: người xem hiểu định vị trong khoảng 10 giây và tìm được kinh nghiệm, dự án, CV trong khoảng 30–60 giây. Đây là tiêu chí kiểm tra thiết kế, không phải số liệu đã đo.

## 6. Phạm vi file dự kiến

| File | Trách nhiệm |
| --- | --- |
| `index.html` | Trang chính, nội dung semantic, điều hướng, metadata |
| `style.css` | CSS thuần, tokens, layout, responsive, theme, motion |
| `script.js` — tạo mới | Menu, theme, hành vi giao diện nhỏ |
| `projects/bluexhome.html` — tạo mới | Case study BlueXHome |
| `projects/love-pdf.html` — tạo mới | Case study Love PDF |
| `img/` | Chân dung, ảnh dự án tối ưu, ảnh preview chia sẻ |
| `assets/quang-huy-ha-cv.pdf` — thêm lúc triển khai | Bản CV đã được cung cấp; đề xuất thống nhất chức danh Full-stack trước khi công khai |
| `README.md` | Cách chạy, cấu trúc, cập nhật nội dung và xuất bản |
| `robots.txt`, `sitemap.xml` — khi chốt domain | Hỗ trợ crawler với URL thật |

Không mặc định thêm CMS, database hoặc backend chỉ để hiển thị portfolio. Nếu loại bỏ Tailwind runtime, thay toàn bộ utility đang dùng bằng CSS đã định nghĩa trước khi gỡ CDN. Giữ file xác minh Google hiện có trừ khi có lý do rõ ràng để đổi.

## 7. Lộ trình thực hiện

### Giai đoạn 1 — Chuẩn hóa nội dung, 0,5–1 ngày

- [x] Xác nhận timeline theo CV, loại hình công việc và trạng thái tốt nghiệp qua trao đổi ngày 12/10/2026.
- [ ] Lập bảng trách nhiệm cá nhân cho hai dự án.
- [ ] Thu thập ảnh, demo, repo, CV và thông tin liên hệ đúng.
- [ ] Chọn stack chính dựa trên bằng chứng.
- [ ] Viết hero, experience, project summaries và about bằng tiếng Anh.

Đầu ra: bản nội dung thống nhất với CV, không có thành tích hoặc số liệu tự tạo.

### Giai đoạn 2 — Thiết kế, 0,5–1 ngày

- [ ] Wireframe desktop/mobile theo thứ tự Hero → Experience → Projects → Skills → About/Education → Contact.
- [ ] Chốt màu, font, spacing, card, button và theme.
- [ ] Review một màn hình hero, một card dự án và mẫu case study.

Đầu ra: mẫu thiết kế có thể review trước khi sửa giao diện.

### Giai đoạn 3 — Trang chính, 1–1,5 ngày

- [ ] Tách CSS/JS về đúng trách nhiệm, xử lý file CSS cũ.
- [ ] Dựng hero và menu, nối CTA với tài nguyên thật.
- [ ] Thêm kinh nghiệm; viết lại dự án và kỹ năng theo Full-stack.
- [ ] Thu gọn học vấn/sở thích, hoàn thiện contact và footer.
- [ ] Sửa anchor, crop ảnh, overflow mobile và hiển thị khi JavaScript không chạy.

Đầu ra: trang chính đủ nội dung và hoạt động ở desktop/mobile.

### Giai đoạn 4 — Case studies, 1–1,5 ngày

- [ ] Viết BlueXHome theo cấu trúc đã thống nhất, ghi rõ nhóm 3 người và đóng góp frontend/backend.
- [ ] Viết Love PDF theo cấu trúc đã thống nhất, ghi rõ nhóm 3 người và đóng góp frontend/backend.
- [ ] Thêm sơ đồ, screenshot và bằng chứng phù hợp.
- [ ] Kiểm tra link, đường dẫn ảnh và điều hướng quay về trang chính.

Đầu ra: hai dự án có thể dùng làm cơ sở trao đổi khi phỏng vấn.

### Giai đoạn 5 — Hoàn thiện và kiểm tra, 0,5–1 ngày

- [ ] Thêm title, description, Open Graph và favicon riêng phù hợp.
- [ ] Tối ưu ảnh, kích thước ảnh cố định, lazy loading ngoài màn hình đầu.
- [ ] Kiểm tra keyboard, focus, label nút icon, menu và reduced motion.
- [ ] Kiểm tra 375px, 768px, 1024px, 1440px; cả theme nếu giữ dark mode.
- [ ] Kiểm tra CV, email, anchor, demo và repo; sửa lỗi console.
- [ ] Kiểm tra website trên hosting đích, cập nhật README và metadata theo domain thật.

Đầu ra: phiên bản sẵn sàng gắn vào CV và hồ sơ ứng tuyển.

Ước lượng tổng: 4–6 ngày làm việc khi đã đủ tài nguyên và nội dung. Thời gian xin phép chia sẻ sản phẩm, sửa CV hoặc bổ sung một dự án web mới tính riêng.

## 8. Tiêu chí nghiệm thu

- Trang đầu thể hiện Full-stack Developer, kinh nghiệm đúng thực tế và CTA rõ ràng.
- Experience có timeline và đóng góp cụ thể.
- Hai case study chỉ ra phần frontend/backend cá nhân thực sự làm.
- Không có dữ liệu giả, link giả hoặc nút không hoạt động.
- CV và website thống nhất thông tin.
- Không có cuộn ngang ở các kích thước kiểm tra.
- Người dùng bàn phím thao tác được menu và các nút; focus nhìn thấy được.
- Nội dung cốt lõi vẫn đọc được khi tắt JavaScript.
- Nếu có dark mode: tương phản và trạng thái theme được kiểm tra trên cả hai chế độ.
- Lighthouse mục tiêu trên trang đã triển khai: Performance ≥90, Accessibility ≥95, SEO ≥95; ghi lại kết quả thực tế, không coi mục tiêu là bảo đảm.
- Mọi mục tiêu chưa đạt phải có nguyên nhân cụ thể và mức ảnh hưởng được ghi nhận trước khi bàn giao.

## 9. Thông tin đã xác nhận và chi tiết bổ sung

Nguồn: CV do người dùng cung cấp và xác nhận trực tiếp ngày 12/10/2026.

| Nội dung | Thông tin |
| --- | --- |
| Học vấn | Greenwich Viet Nam, 2022–2026; đã tốt nghiệp loại Giỏi |
| XEPO | Backend Developer (Web Crawling), part-time, 02/2025–03/2026; Node.js/NestJS, Puppeteer theo CV |
| NETVIET | Full-stack Developer, full-time; BlueXHome 01/06/2026–15/07/2026; Love PDF 20/07/2026–01/09/2026 theo CV |
| BlueXHome và Love PDF | Nhóm 3 người; tham gia cả backend và frontend |
| Nghiên cứu | Tham gia code và báo cáo cho người hướng dẫn; chưa xác nhận tư cách tác giả |
| Liên hệ theo CV | 0986774322, huydev204@gmail.com, github.com/huysadboizdev |

Đã đủ thông tin để chốt hướng nội dung và thiết kế bản đầu. Các chi tiết dưới đây có thể bổ sung trong quá trình xây case study, không ngăn việc bắt đầu thiết kế:

1. Backend stack của BlueXHome/Love PDF, các module trực tiếp phụ trách và một vấn đề kỹ thuật đã giải quyết ở mỗi dự án.
2. Screenshot, video demo và quyền chia sẻ tài nguyên dự án công ty.
3. Phần code cụ thể trong nghiên cứu nếu muốn mô tả sâu hơn.
4. Domain/hosting đang dùng và tài khoản Zalo tương ứng nếu giữ link Zalo.

Không tự gán toàn bộ chức năng của sản phẩm cho cá nhân khi chưa biết phân công; mô tả ở mức đã xác nhận và phân biệt thành quả nhóm với đóng góp cá nhân.
