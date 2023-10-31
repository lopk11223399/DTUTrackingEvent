import avatar from '../assets/Story_(13).jpg'

export const statusEvent = [
	{
		id: 1,
		valueStatus: 'pending',
		textStatus: 'Chờ xác nhận',
		textCss: 'text-white',
		bgCss_light: 'bg-statusColor_panel_gray_light',
		bgCss_dark: 'bg-statusColor_panel_gray_dark',
	},
	{
		id: 2,
		valueStatus: 'accepted',
		textStatus: 'Sắp diễn ra',
		textCss: 'text-white',
		bgCss_light: 'bg-statusColor_panel_red_light',
		bgCss_dark: 'bg-statusColor_panel_red_dark',
	},
	{
		id: 3,
		valueStatus: 'in process...',
		textStatus: 'Đang diễn ra',
		textCss: 'text-white',
		bgCss_light: 'bg-statusColor_panel_green',
		bgCss_dark: 'bg-statusColor_panel_green',
	},
	{
		id: 4,
		valueStatus: 'completed',
		textStatus: 'Đã kết thúc',
		textCss: 'text-white',
		bgCss_light: 'bg-statusColor_panel_gray_light',
		bgCss_dark: 'bg-statusColor_panel_gray_dark',
	},
	{
		id: 5,
		valueStatus: 'closed',
		textStatus: 'Đã bị hủy',
		textCss: 'text-white',
		bgCss_light: 'bg-statusColor_panel_gray_light',
		bgCss_dark: 'bg-statusColor_panel_gray_dark',
	},
]

export const gender = [
	{
		id: 1,
		label: 'Nam',
		value: 'false',
	},
	{
		id: 2,
		label: 'Nữ',
		value: 'true',
	},
]

export const settings = [
	{
		id: 1,
		text: 'quản lý tài khoản',
		navigate: 'ManageAccount',
	},
	{
		id: 2,
		text: 'quản lý thông tin',
		navigate: 'ManageInformation',
	},
	{
		id: 3,
		text: 'cài đặt hiển thị',
		navigate: 'ManageView',
	},
	{
		id: 4,
		text: 'phản hồi',
		navigate: 'Feedback',
	},
]

export const settingView = [
	{
		id: 1,
		text: 'Tự động (Mặc định của hệ thống)',
		value: 'dark-default',
	},
	{
		id: 2,
		text: 'Chế độ sáng',
		value: 'light',
	},
	{
		id: 3,
		text: 'Chế độ tối',
		value: 'dark',
	},
]

export const tabListEvent = [
	{
		id: 1,
		text: 'Sự Kiện Hot',
		value: 'hot',
	},
	{
		id: 2,
		text: 'Sự Kiện Hôm Nay',
		value: 'today',
	},
	{
		id: 3,
		text: 'Sự Kiện Mới',
		value: 'new',
	},
	// {
	// 	id: 4,
	// 	text: 'None',
	// 	value: 'None',
	// },
]

export const event = [
	{
		idEvent: 1,
		nameEvent:
			'[Ra Mắt Sự Kiện Web] Mộng Cảnh Ánh Sao - Tham Gia Sự Kiện Để Nhận Nguyên Thạch Và Các Phần Thưởng Khác Trong Game!',
		image:
			'https://fastcdn.hoyoverse.com/content-v2/hk4e/113150/a56f2a4f582d476c2c0f95523bb6c61e_6367814829951642445.png',
		author: {
			idUser: 1,
			name: 'Tên người tổ chức sự kiện',
			email: 'Email liên hệ',
			avatar:
				'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
		},
		follower: [1, 2],
		startDate: '2023-09-28 08:00:00',
		endDate: '2023-10-08 17:00:00',
		createdAt: '12/12/2023 9:30:21 AM',
		statusEvent: {
			idStatus: 3,
			nameStatus: 'in process',
			textStatus: 'Đang diễn ra',
		},
		locationEvent:
			'30, Đường Nguyễn Hữu Thọ, Phường Hòa Thuận Tây, Quận Hải Châu, Đà Nẵng, Việt Nam',
		commentEvent: [
			{
				idUser: 2,
				name: 'Hoang P',
				commemt:
					'Sự kiện này như thế nào?fdljshfkjshdfhkjshdkjfhskdhfkshdfkshfkjshdfjsjdhfksdhfkjhsdj',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
				feedback: {
					idUser: 1,
					name: 'Tên người tổ chức sự kiện',
					commemt: 'Tốt',
					avatar:
						'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
				},
			},
			{
				idUser: 3,
				name: 'Hoang P123123',
				commemt: 'Sự kiện này diễn ra ở đâu?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
		],
		description: `Khoảnh khắc trong hành trình, gặp gỡ bạn bè, cùng tạo nên cảnh đẹp rực rỡ trên chuyến hành trình. Cùng Paimon say giấc trong dải ngân hà, xem lại hành trình diệu kỳ tựa ánh sao trong suốt một năm qua. >>Nhấn để tham gia sự kiện<< 〓Thời Gian Sự Kiện〓 28/09/2023 - 23:59 12/10/2023 (UTC+8) *Sau khi kết thúc sự kiện sẽ không thể nhận thưởng, Nhà Lữ Hành hãy nhanh tay nhận nhé* 〓Điều Kiện Tham Gia〓 Nhà Lữ Hành có hạng mạo hiểm ≥10 có thể tham gia sự kiện. *Dữ liệu trong sự kiện Mộng Cảnh Ánh Sao thống kê tính đến 00:00 25/09/2023 (UTC+8) (Có thể tồn tại chênh lệch khoảng 30 phút), phạm vi thống kê bao gồm Nhà Lữ Hành có hạng mạo hiểm ≥10 trước thời gian thống kê. 〓Giới Thiệu Sự Kiện〓 Trong thời gian sự kiện, Nhà Lữ Hành có thể nhấn vào quyển dữ liệu khác nhau để xem kỷ niệm hành trình của riêng mình. Sau khi xem hết, sẽ nhận được Nguyên Thạch và các phần thưởng khác trong game. Nhà Lữ Hành còn có thể chia sẻ sự kiện, thu thập các chúc phúc khác nhau để nhận các phần thưởng trong game. 〓Chia Sẻ Kỷ Niệm〓 Sau khi xem xong tất cả quyển dữ liệu, Nhà Lữ Hành có thể vào tổng kết năm, tùy chỉnh kỷ niệm hành trình của mình, sau khi chỉnh sửa có thể tạo ra thẻ kỷ niệm hành trình năm nay của riêng mình; Nhà Lữ Hành có thể chia sẻ kỷ niệm hành trình của mình cho người khác dưới dạng liên kết/hình ảnh. Đồng thời có thể chia sẻ liên kết để mời bạn bè tiến hành chia sẻ dữ liệu, lần đầu chia sẻ thành công sẽ nhận được Nguyên Thạch và các phần thưởng khác trong game. 〓Chia Sẻ Và Thu Thập Chúc Phúc〓 Sau khi xem xong tất cả quyển dữ liệu, Nhà Lữ Hành có thể nhấn nút Chia Sẻ Chúc Phúc ở góc trên bên phải của trang chủ sự kiện để vào giao diện Thu Thập Chúc Phúc. Nhà Lữ Hành có thể chia sẻ chúc phúc cho bạn bè thông qua liên kết. Đồng thời, khi Nhà Lữ Hành nhấn vào liên kết của bạn bè sẽ thu thập được chúc phúc khác và nhận thưởng. *Mỗi liên kết được chia sẻ tối đa có thể nhận chúc phúc 20 lần. 〓Thưởng Sự Kiện〓 -THƯỞNG XEM HẾT TẤT CẢ QUYỂN DỮ LIỆU- Sau khi xem hết tất cả quyển dữ liệu, Nhà Lữ Hành sẽ nhận được phần thưởng tương ứng. Tổng cộng nhận được Nguyên Thạch ×180, Kinh Nghiệm Anh Hùng ×12. -THƯỞNG THU THẬP CHÚC PHÚC- Thu thập chúc phúc khác nhau, khi đủ 5 loại chúc phúc, Nhà Lữ Hành sẽ nhận được thưởng chúc phúc tương ứng và thưởng thu thập toàn bộ chúc phúc. Tổng cộng nhận được Mora ×70.000, Ma Khoáng Tinh Đúc ×4, cùng nhiều loại sản vật và món ăn Teyvat. -THƯỞNG CHIA SẺ- Khi chia sẻ dữ liệu tùy chỉnh, chia sẻ dữ liệu cùng người chơi khác, Nhà Lữ Hành sẽ có thể nhận thưởng tương ứng. Tổng cộng nhận được Mora ×40.000. *Phần thưởng sẽ được phát qua thư trong game, thư có thời hạn 30 ngày, hãy chú ý nhận nhé.`,
		joined: [1, 3, 4, 5, 6],
		maxJoin: 10,
	},
	{
		idEvent: 2,
		nameEvent: 'Sự kiện web Lễ Hội Kỷ Niệm 3 Năm "Hân Hoan Hội Ngộ" đã ra mắt',
		image:
			'https://fastcdn.hoyoverse.com/content-v2/hk4e/113170/577fbc4b46decbc2f8fb23ee8e5644d6_4937760615586444842.jpg',
		author: {
			idUser: 1,
			name: 'Tên người tổ chức sự kiện',
			email: 'Email liên hệ',
			avatar:
				'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
		},
		follower: [2],
		startDate: '2023-09-27 08:00:00',
		endDate: '2023-10-07 17:00:00',
		createdAt: '12/12/2023 9:30:21 AM',
		statusEvent: {
			idStatus: 2,
			nameStatus: 'accepted',
			textStatus: 'Sắp diễn ra',
		},
		locationEvent:
			'30, Đường Nguyễn Hữu Thọ, Phường Hòa Thuận Tây, Quận Hải Châu, Đà Nẵng, Việt Nam',
		commentEvent: [
			{
				idUser: 2,
				name: 'Hoang P',
				commemt: 'Sự kiện này như thế nào?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
			{
				idUser: 3,
				name: 'Hoang P123123',
				commemt: 'Sự kiện này diễn ra ở đâu?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
				feedback: {
					idUser: 1,
					name: 'Tên người tổ chức sự kiện',
					avatar:
						'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
					commemt: 'Tốt',
				},
			},
			{
				idUser: 6,
				name: 'Hoang P',
				commemt: 'Sự kiện này như thế nào?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
			{
				idUser: 7,
				name: 'Hoang P',
				commemt: 'Sự kiện này như thế nào?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
			{
				idUser: 8,
				name: 'Hoang P',
				commemt: 'Sự kiện này như thế nào?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
		],
		description: `Giờ phút hân hoan, bạn bè hội ngộ, hãy mau cùng Paimon giúp đỡ chuẩn bị cho lễ hội nào! Hoàn thành các trò chơi nhỏ tại gian hàng, còn có thể thu thập tất cả Tem Kỷ Niệm cũng như nhận Nguyên Thạch và các phần thưởng khác đấy! >>> Nhấn để tham gia sự kiện <<< Thời Gian Sự Kiện 27/09/2023 - 23:59 04/10/2023 (UTC+8) 〓Điều Kiện Tham Gia〓 Nhà Lữ Hành có Hạng mạo hiểm ≥10 có thể tham gia sự kiện. Giới Thiệu Sự Kiện 1. Lễ Hội có tổng cộng 3 nhiệm vụ gian hàng, các Nhà Lữ Hành có thể đến các gian hàng khác nhau để hoàn thành nhiệm vụ, giúp đỡ chuẩn bị cho lễ hội. Lần đầu hoàn thành nhiệm vụ gian hàng sẽ nhận Tem Kỷ Niệm ×2 và thưởng nhiệm vụ (Chỉ lần đầu tiên hoàn thành mới được nhận). Sau đó vẫn có thể tiếp tục hoàn thành nhiệm vụ, mỗi lần chỉ nhận được 1 Tem. 2. Hoàn thành 3 nhiệm vụ gian hàng sẽ thu thập đủ 5 Tem và nhận được phần thưởng 40 Nguyên Thạch. 3. Sau khi thu thập đủ 5 Tem, các Nhà Lữ Hành có thể chia sẻ Bộ Tem lên mạng xã hội để nhận được Gà Nấu Hoa Ngọt ×3 và có cơ hội tham gia rút thưởng để nhận Mô Hình Nhân Vật ngẫu nhiên. 4. Ưu tiên rơi Tem Kỷ Niệm mà Nhà Lữ Hành chưa nhận được, sau khi thu thập đủ 5 Tem thì sẽ rơi ngẫu nhiên. Thưởng Sự Kiện Nguyên Thạch ×40 Kinh Nghiệm Anh Hùng ×3 Mora ×20.000 Ma Khoáng Tinh Đúc ×5 Gà Nấu Hoa Ngọt ×3 *Phần thưởng trên sẽ nhận được khi tham gia sự kiện Lễ Hội và hoàn thành nhiệm vụ chỉ định* Mô Hình Nhân Vật Ngẫu Nhiên ×30 *Phần thưởng trên sẽ ngẫu nhiên dành tặng cho Nhà Lữ Hành chia sẻ thành công Bộ Tem được chọn trên toàn bộ nền tảng* Cách Chia Sẻ Bộ Tem Chọn nền tảng mạng xã hội bất kỳ dưới đây, chia sẻ theo quy tắc để tham gia rút thưởng X (Twitter)/VK: Nhấn nút Chia Sẻ hoặc sao chép link sự kiện, kèm theo mã số Bộ Tem của bạn và hashtag #GenshinImpactCarnival trong văn bản chia sẻ. Sau khi chia sẻ thành công sẽ có thể tham gia rút thưởng Facebook: Nhấn nút Chia Sẻ hoặc sao chép link sự kiện, kèm theo mã số Bộ Tem của bạn và hashtag #GenshinImpactCarnival trong văn bản, đăng tải lên trang cá nhân (Cần thiết lập trang cá nhân ở chế độ công khai). Sau khi chia sẻ thành công sẽ có thể tham gia rút thưởng Lưu Ý Rút Thưởng Mô Hình Mỗi Bộ Tem của Nhà Lữ Hành sẽ có mã số Bộ Tem riêng, mã số sẽ liên kết với email tài khoản HoYoverse mà Nhà Lữ Hành dùng để tham gia sự kiện này, bảng câu hỏi thu thập thông tin người đoạt giải để gửi mô hình sẽ được gửi đến email tương ứng với tài khoản HoYoverse tham gia sự kiện. Cách Phát Thưởng 1. Phần thưởng đạo cụ trong game sẽ được phát qua thư trong game, thư có thời hạn 30 ngày. Vượt quá thời hạn không nhận sẽ xem là tự động từ bỏ phần thưởng, các Nhà Lữ Hành hãy chú ý nhận nhé. 2. Danh sách đoạt giải phần thưởng hiện vật sẽ được công bố trên mạng xã hội trong 7 ngày làm việc sau khi kết thúc sự kiện. Bảng câu hỏi sẽ được gửi đến email liên kết với tài khoản HoYoverse tham gia sự kiện của người đoạt giải trong vòng 3 ngày làm việc, người đoạt giải vui lòng nhấn vào bảng câu hỏi để gửi thông tin địa chỉ nhận hàng và phương thức liên lạc cá nhân trước 23:59 25/10/2023 (UTC+8). Nếu quá thời hạn vẫn chưa điền sẽ xem như từ bỏ phần thưởng. 3. Xin lưu ý, sau khi xác nhận địa chỉ nhận hàng sẽ không thể sửa đổi. Nếu vì nguyên nhân bất khả kháng dẫn đến điền sai, hãy liên hệ CSKH để xác nhận và sửa đổi trước 23:59 29/10/2023 (UTC+8). Vui lòng sử dụng tiêu đề \"Sự Kiện Lễ Hội Kỷ Niệm 3 Năm - Sửa Địa Chỉ\" và gửi email tới hòm thư CSKH genshin_cs@hoyoverse.com. 4. Thời gian phát hàng dự kiến của phần thưởng hiện vật là trong vòng 90 ngày sau khi sự kiện kết thúc. Sau khi ban tổ chức sự kiện phát hàng sẽ liên hệ và thông báo thông tin vận chuyển liên quan cho người trúng thưởng. Thời gian nhận hàng thực tế phụ thuộc vào tình hình vận chuyển thực tế. 5. Đơn vị tổ chức sự kiện sẽ chịu các chi phí cần thiết cho việc vận chuyển phần thưởng hiện vật. Nếu phát sinh thuế quan, thuế cá nhân và các loại thuế liên quan khác do chính sách địa phương, người trúng thưởng cần khai báo và chịu các nghĩa vụ thuế liên quan theo chính sách của quốc gia hoặc khu vực. Vui lòng tham khảo luật, quy định và chính sách thuế của quốc gia hoặc khu vực của bạn. Lưu Ý 1. Để cung cấp dịch vụ vận chuyển của bên thứ ba cho việc gửi phần thưởng đến bạn, chúng tôi sẽ thu thập và sử dụng các dữ liệu cá nhân của bạn như địa chỉ, thông tin liên hệ v.v. Những dữ liệu cá nhân nêu trên sẽ chỉ được sử dụng bởi chúng tôi và nhà cung cấp dịch vụ vận chuyển, chúng tôi sẽ không tiết lộ với các bên thứ ba nào khác nếu chưa nhận được sự đồng ý của bạn. 2. Để biết thêm thông tin chi tiết về nội dung Chính Sách Về Quyền Riêng Tư có thể truy cập trang chủ chính thức của game. Mọi thông tin cá nhân được thu thập và sử dụng sẽ tuân thủ nghiêm ngặt Chính Sách Về Quyền Riêng Tư. https://genshin.hoyoverse.com/vi/company/privacy 3. Nếu bạn là trẻ vị thành niên được quy định bởi luật pháp và quy định của quốc gia/khu vực nơi bạn cư trú, bạn phải tham gia sự kiện này và cung cấp thông tin cá nhân liên quan dưới sự đồng ý của người giám hộ. 4. Nếu bạn có bất kỳ thắc mắc nào về sự kiện web này, vui lòng gửi đến hòm thư CSKH là genshin_cs@hoyoverse.com. 5. Sự kiện này do HoYoverse tổ chức. Các tổ chức bên thứ ba được nhắc tới chỉ dùng để tham khảo và nhận biết, không nhằm ngụ ý việc công nhận, tài trợ hoặc phụ thuộc của tổ chức bên thứ ba đối với sự kiện hoặc HoYoverse.`,
		joined: [1, 3, 4, 5, 6.7, 8, 9, 10, 11, 12, 13, 14, 45],
		maxJoin: 30,
	},
	{
		idEvent: 3,
		nameEvent:
			'[Genshin Impact] Video Kỷ Niệm Mạo Hiểm Teyvat: Thư Kỷ Niệm Ba Năm Hành Trình',
		image:
			'https://fastcdn.hoyoverse.com/content-v2/hk4e/113181/e181034b313a43b486729bcea0d5e91f_2259210108544192640.jpg',
		author: {
			idUser: 1,
			name: 'Tên người tổ chức sự kiện',
			email: 'Email liên hệ',
			avatar:
				'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
		},
		follower: [2],
		startDate: '2023-09-28 08:00:00',
		endDate: '2023-10-08 17:00:00',
		createdAt: '12/12/2023 9:30:21 AM',
		statusEvent: {
			idStatus: 4,
			nameStatus: 'completed',
			textStatus: 'Đã diễn ra',
		},
		locationEvent:
			'30, Đường Nguyễn Hữu Thọ, Phường Hòa Thuận Tây, Quận Hải Châu, Đà Nẵng, Việt Nam',
		commentEvent: [
			{
				idUser: 2,
				name: 'Hoang P',
				commemt: 'Sự kiện này như thế nào?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
			{
				idUser: 3,
				name: 'Hoang P123123',
				commemt: 'Sự kiện này diễn ra ở đâu?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
			{
				idUser: 4,
				name: 'Hoang P123123',
				commemt: 'Sự kiện này diễn ra ở đâu?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
		],
		description: `Thư Kỷ Niệm Hành Trình Đến Rồi Đây! Bài ca dũng sĩ vang lên, cuốn sách mạo hiểm tiếp tục sang trang, chuyến hành trình vẫn còn tiếp diễn, bạn đồng ý tham gia chứ?`,
		joined: [1, 2, 3, 4, 5],
		maxJoin: 10,
	},
	{
		idEvent: 4,
		nameEvent: '[Genshin Impact] - Lyney: Sự Thật Dưới Ánh Hào Quang',
		image:
			'https://webstatic.hoyoverse.com/upload/op-public/2023/08/16/eb49ea06bd5e8264712b08b78b6f3b2b_5796970038060350858.jpg',
		author: {
			idUser: 1,
			name: 'Tên người tổ chức sự kiện',
			email: 'Email liên hệ',
			avatar:
				'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
		},
		follower: [1],
		startDate: '2023-08-16 08:00:00',
		endDate: '2023-08-26 17:00:00',
		createdAt: '12/12/2023 9:30:21 AM',
		statusEvent: {
			idStatus: 5,
			nameStatus: 'closed',
			textStatus: 'Đã bị hủy',
		},
		locationEvent:
			'30, Đường Nguyễn Hữu Thọ, Phường Hòa Thuận Tây, Quận Hải Châu, Đà Nẵng, Việt Nam',
		commentEvent: [],
		description: `Những người bất chấp tìm ra chân tướng phía sau màn ảo thuật thường bị cho là người vô vị, nhưng Lyney không phản đối điều này. Nếu có người lật tẩy được mánh khóe của anh ấy dưới ánh sáng sân khấu, thì chẳng phải là một kỳ tích sao.`,
		joined: [],
		maxJoin: 10,
	},
	{
		idEvent: 5,
		nameEvent:
			'Sự Kiện Web "Tập Hợp Nhà Mạo Hiểm Fontaine", Tham Gia Có Cơ Hội Nhận Tối Đa 480 Nguyên Thạch!',
		image:
			'https://webstatic.hoyoverse.com/upload/op-public/2023/08/16/79b3f5b663b8c0671001cc6bab1fa3a8_6782432613077097673.jpg',
		author: {
			idUser: 1,
			name: 'Tên người tổ chức sự kiện',
			email: 'Email liên hệ',
			avatar:
				'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
		},
		follower: [1],
		startDate: '2023-08-16 08:00:00',
		endDate: '2023-08-26 17:00:00',
		createdAt: '12/12/2023 9:30:21 AM',
		statusEvent: {
			idStatus: 5,
			nameStatus: 'closed',
			textStatus: 'Đã bị hủy',
		},
		locationEvent:
			'30, Đường Nguyễn Hữu Thọ, Phường Hòa Thuận Tây, Quận Hải Châu, Đà Nẵng, Việt Nam',
		commentEvent: [
			{
				idUser: 2,
				name: 'Hoang P',
				commemt: 'Sự kiện này như thế nào?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
			{
				idUser: 3,
				name: 'Hoang P123123',
				commemt: 'Sự kiện này diễn ra ở đâu?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
			{
				idUser: 4,
				name: 'Hoang P123123',
				commemt: 'Sự kiện này diễn ra ở đâu?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
		],
		description: `Nhà Lữ Hành thân mến, Hành trình mạo hiểm đại lục Teyvat đã mở ra chương mới, kêu gọi bạn bè đến hội tụ tại vương quốc của nước - Fontaine và cùng hoàn thành nhiệm vụ mạo hiểm, tối đa có thể nhận được 480 Nguyên Thạch! >> Nhấn đến tham gia sự kiện << 〓Thời Gian Sự Kiện〓 Thời gian sự kiện: 16/08/2023 - 23:59 06/09/2023 (UTC+8) Thời gian đổi thưởng: 16/08/2023 - 23:59 12/09/2023 (UTC+8) 〓Giới Thiệu Sự Kiện〓 1. Trong thời gian sự kiện, Nhà Lữ Hành đăng nhập web để tham gia sự kiện bằng Thẻ Thông Hành HoYoverse hoặc UID Genshin Impact đã liên kết email (Hỗ trợ đăng nhập bằng tài khoản kênh thứ ba: tài khoản Google, tài khoản Apple ID, Twitter, Facebook) 2. Trong thời gian sự kiện, người chơi có thể mời Nhà Lữ Hành trở về, khi Nhà Lữ Hành trở về hoàn thành liên kết Mã Tập Hợp trong trang web, người mời sẽ nhận được số phong thư tương ứng 3. Nhà Lữ Hành được mời hoàn thành nhiệm vụ mạo hiểm trên trang web sẽ nhận được số phong thư. Nhiệm vụ sẽ làm mới vào 04:00 AM mỗi ngày theo thời gian server 4. Sau khi Nhà Lữ Hành nhận được phong thư, có thể dựa vào số phong thư để đổi Nguyên Thạch và Mora ở các mức khác nhau 5. Sau khi Nhà Lữ Hành trở về hoàn thành liên kết Mã Tập Hợp và kích hoạt trong game, sẽ nhận được Kinh Nghiệm Anh Hùng ×5, Mora ×50.000, Ma Khoáng Tinh Đúc ×10 6. Mỗi tài khoản chỉ giới hạn UID lần đầu liên kết được tham gia sự kiện này 7. Nhà Lữ Hành chỉ có thể dùng tài khoản HoYoverse của mình để mời bạn bè. Nếu Nhà Lữ Hành chia sẻ cho tài khoản HoYoverse khác của bản thân hoặc tạo số liệu mời giả theo cách khác, sẽ hủy bỏ và thu hồi phần thưởng nhận được. 8. Nhà Lữ Hành chỉ có thể hoàn thành nhiệm vụ tập hợp và nhiệm vụ mạo hiểm trong thời gian diễn ra sự kiện, sau khi kết thúc sự kiện chỉ có thể đổi phần thưởng. 〓Phần Thưởng〓 〓Nhà Lữ Hành Trở Lại〓 1. Hạng mạo hiểm ≥10 2. Trong 14 ngày trước khi sự kiện bắt đầu chưa đăng nhập game 〓Lưu Ý〓 1. Phần thưởng đạo cụ trong game sẽ được phát qua thư trong game, thư có thời hạn 30 ngày, hãy chú ý nhận nhé. 2. Để biết thêm thông tin chi tiết về nội dung Chính Sách Về Quyền Riêng Tư có thể truy cập trang chủ chính thức của game. Mọi thông tin cá nhân được thu thập và sử dụng sẽ tuân thủ nghiêm ngặt Chính Sách Về Quyền Riêng Tư. https://genshin.hoyoverse.com/company/privacy 3. Nếu bạn có bất kỳ thắc mắc nào về sự kiện web này, vui lòng gửi đến hòm thư CSKH là genshin_cs@hoyoverse.com. 4. Sự kiện này do HoYoverse tổ chức. Các tổ chức bên thứ ba được nhắc tới chỉ dùng để tham khảo và nhận biết, không nhằm ngụ ý việc công nhận, tài trợ hoặc phụ thuộc của tổ chức bên thứ ba đối với sự kiện hoặc HoYoverse. 5. Bạn đã hiểu và đồng ý rằng bạn chỉ có thể liên kết 1 Mã Tập Hợp, sau khi liên kết sẽ không thể thay đổi. Sau khi liên kết Mã Tập Hợp, vì để cập nhật tiến độ sự kiện mới nhất, UID, nickname, hình đại diện và tình trạng hoàn thành nhiệm vụ của bạn sẽ được thu thập và hiển thị trên trang của người mời. *Chi tiết sự kiện vui lòng xem tại trang sự kiện - Quy Tắc Sự Kiện. *Sự kiện web này chỉ mang tính chất giải trí, không liên quan đến tình hình thực tế trong trò chơi.`,
		joined: [1, 2, 3],
		maxJoin: 10,
	},
	{
		idEvent: 6,
		nameEvent:
			'Giới thiệu nhân vật trong Genshin Impact - Lynette: Mèo Con Trong Hộp',
		image:
			'https://webstatic.hoyoverse.com/upload/op-public/2023/08/15/97cc43df66d0eb3f03b42d0636987db8_8781792323969504606.jpg',
		author: {
			idUser: 1,
			name: 'Tên người tổ chức sự kiện',
			email: 'Email liên hệ',
			avatar:
				'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
		},
		follower: [1],
		startDate: '2023-08-15 08:00:00',
		endDate: '2023-08-25 17:00:00',
		createdAt: '12/12/2023 9:30:21 AM',
		statusEvent: {
			idStatus: 2,
			nameStatus: 'pending',
			textStatus: 'Sắp diễn ra',
		},
		locationEvent:
			'30, Đường Nguyễn Hữu Thọ, Phường Hòa Thuận Tây, Quận Hải Châu, Đà Nẵng, Việt Nam',
		commentEvent: [
			{
				idUser: 2,
				name: 'Hoang P',
				commemt: 'Sự kiện này như thế nào?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
			{
				idUser: 3,
				name: 'Hoang P123123',
				commemt: 'Sự kiện này diễn ra ở đâu?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
			{
				idUser: 5,
				name: 'Hoang P123123',
				commemt: 'Sự kiện này diễn ra ở đâu?',
				avatar:
					'https://baogiaothong.mediacdn.vn/upload/2-2022/images/2022-05-25/4-1653445668-151-width740height377.jpg',
			},
		],
		description: `Hộp quà không biết xuất hiện từ khi nào khẽ lắc lư, khiến người khác không khỏi tò mò muốn mở ra xem thử. ...Cẩn thận, đừng để bị lừa! Bé mèo con đó chưa chắc đã ở trong hộp, mà đang núp ở một góc nào đó đợi chờ con mồi sập bẫy.`,
		joined: [1, 2],
		maxJoin: 2,
	},
]

export const user = {
	id: 2,
	name: 'Phan Nhat Hoang',
	email: 'hoang@gmail.com',
	gender: 'Nam',
	birthDate: '4/1/2002',
	address:
		'30, Đường Nguyễn Hữu Thọ, Phường Hòa Thuận Tây, Quận Hải Châu, Đà Nẵng, Việt Nam',
	phone: '0356193413',
	avatar: avatar,
	roleId: 3,
	roleData: {
		id: 3,
		nameRole: 'học sinh',
	},
	facultyCode: 1,
	facultyData: {
		faculty_code: 1,
		nameFaculty: 'Viện đào tạo quốc tế',
	},
	listEventJoined: [2, 3],
	listEventFollowed: [1, 2],
	studentData: {
		studentId: 1,
		classCode: 'DTE-IS 102 Q',
		program: 'K-26 - Kỹ Thuật Mạng Chuẩn CMU (Đại Học)',
		studentCode: '26201141758',
		point: 20,
	},
	eventFollowed: [
		{
			idEvent: 1,
			nameEvent:
				'[Ra Mắt Sự Kiện Web] Mộng Cảnh Ánh Sao - Tham Gia Sự Kiện Để Nhận Nguyên Thạch Và Các Phần Thưởng Khác Trong Game!',
			image:
				'https://fastcdn.hoyoverse.com/content-v2/hk4e/113150/a56f2a4f582d476c2c0f95523bb6c61e_6367814829951642445.png',
			statusEvent: {
				idStatus: 3,
				nameStatus: 'in process',
				textStatus: 'Đang diễn ra',
			},
			joined: [1, 3, 4, 5, 6.7, 8, 9, 10, 11, 12, 13, 14, 45],
			maxJoin: 30,
		},
		{
			idEvent: 2,
			nameEvent:
				'Sự kiện web Lễ Hội Kỷ Niệm 3 Năm "Hân Hoan Hội Ngộ" đã ra mắt',
			image:
				'https://fastcdn.hoyoverse.com/content-v2/hk4e/113170/577fbc4b46decbc2f8fb23ee8e5644d6_4937760615586444842.jpg',
			statusEvent: {
				idStatus: 2,
				nameStatus: 'accepted',
				textStatus: 'Sắp diễn ra',
			},
			joined: [1, 2, 3, 4, 5],
			maxJoin: 10,
		},
		{
			idEvent: 3,
			nameEvent:
				'[Genshin Impact] Video Kỷ Niệm Mạo Hiểm Teyvat: Thư Kỷ Niệm Ba Năm Hành Trình',
			image:
				'https://fastcdn.hoyoverse.com/content-v2/hk4e/113181/e181034b313a43b486729bcea0d5e91f_2259210108544192640.jpg',
			statusEvent: {
				idStatus: 4,
				nameStatus: 'completed',
				textStatus: 'Đã diễn ra',
			},
			joined: [1, 2, 3, 4, 5],
			maxJoin: 10,
		},
	],
	eventJoined: [
		{
			idEvent: 6,
			nameEvent:
				'Giới thiệu nhân vật trong Genshin Impact - Lynette: Mèo Con Trong Hộp',
			image:
				'https://webstatic.hoyoverse.com/upload/op-public/2023/08/15/97cc43df66d0eb3f03b42d0636987db8_8781792323969504606.jpg',
			statusEvent: {
				idStatus: 2,
				nameStatus: 'pending',
				textStatus: 'Sắp diễn ra',
			},
			joined: [1, 2],
			maxJoin: 2,
		},
		{
			idEvent: 3,
			nameEvent:
				'[Genshin Impact] Video Kỷ Niệm Mạo Hiểm Teyvat: Thư Kỷ Niệm Ba Năm Hành Trình',
			image:
				'https://fastcdn.hoyoverse.com/content-v2/hk4e/113181/e181034b313a43b486729bcea0d5e91f_2259210108544192640.jpg',
			statusEvent: {
				idStatus: 4,
				nameStatus: 'completed',
				textStatus: 'Đã diễn ra',
			},
			joined: [1, 2, 3, 4, 5],
			maxJoin: 10,
		},
		{
			idEvent: 5,
			nameEvent:
				'Sự Kiện Web "Tập Hợp Nhà Mạo Hiểm Fontaine", Tham Gia Có Cơ Hội Nhận Tối Đa 480 Nguyên Thạch!',
			image:
				'https://webstatic.hoyoverse.com/upload/op-public/2023/08/16/79b3f5b663b8c0671001cc6bab1fa3a8_6782432613077097673.jpg',
			statusEvent: {
				idStatus: 5,
				nameStatus: 'closed',
				textStatus: 'Đã bị hủy',
			},
			joined: [1, 2, 3],
			maxJoin: 10,
		},
	],
}

export const notification = [
	{
		id: 3,
		senderId: 6,
		recipientId: 2,
		senderData: {
			senderId: 6,
			createdAt: '2023-09-16T15:09:58.073+00:00',
			image: 'https://cdn.chanhtuoi.com/uploads/2021/11/anh-bau-troi-45.jpg',
			name: 'Tên sự kiện',
			content: 'sự kiện này sắp diễn ra',
		},
		isWatched: false,
		typenotification: 1,
		typenotificationData: {
			idNotification: 1,
			nameNotification: 'hệ thống',
		},
	},
	{
		id: 1,
		senderId: 3,
		recipientId: 2,
		senderData: {
			senderId: 3,
			createdAt: '2023-09-15T15:09:58.073+00:00',
			image: 'https://cdn.chanhtuoi.com/uploads/2021/11/anh-bau-troi-45.jpg',
			name: 'Tên sự kiện',
			content: 'Sự kiện đã kết thúc. Bạn hãy đánh giá sự kiện',
		},
		isWatched: false,
		typenotification: 1,
		typenotificationData: {
			idNotification: 1,
			nameNotification: 'hệ thống',
		},
	},
	{
		id: 2,
		senderId: 5,
		recipientId: 2,
		senderData: {
			senderId: 5,
			createdAt: '2023-09-15T15:09:58.073+00:00',
			image: 'https://cdn.chanhtuoi.com/uploads/2021/11/anh-bau-troi-45.jpg',
			name: 'Tên sự kiện Tên sự kiện Tên sự kiện Tên sự kiện',
			content: 'sự kiện này đã bị hủy bỏ',
		},
		isWatched: false,
		typenotification: 1,
		typenotificationData: {
			idNotification: 1,
			nameNotification: 'hệ thống',
		},
	},
	{
		id: 4,
		senderId: 5,
		recipientId: 2,
		senderData: {
			senderId: 5,
			createdAt: '2023-09-15T15:09:58.073+00:00',
			image: 'https://cdn.chanhtuoi.com/uploads/2021/11/anh-bau-troi-45.jpg',
			name: 'Tên sự kiện Tên sự kiện Tên sự kiện Tên sự kiện',
			content: 'sự kiện này đã bị hủy bỏ',
		},
		isWatched: false,
		typenotification: 1,
		typenotificationData: {
			idNotification: 1,
			nameNotification: 'hệ thống',
		},
	},
	{
		id: 6,
		senderId: 5,
		recipientId: 2,
		senderData: {
			senderId: 5,
			createdAt: '2023-09-15T15:09:58.073+00:00',
			image: 'https://cdn.chanhtuoi.com/uploads/2021/11/anh-bau-troi-45.jpg',
			name: 'Tên sự kiện Tên sự kiện Tên sự kiện Tên sự kiện',
			content: 'sự kiện này đã bị hủy bỏ',
		},
		isWatched: false,
		typenotification: 1,
		typenotificationData: {
			idNotification: 1,
			nameNotification: 'hệ thống',
		},
	},
	{
		id: 7,
		senderId: 5,
		recipientId: 2,
		senderData: {
			senderId: 5,
			createdAt: '2023-09-15T15:09:58.073+00:00',
			image: 'https://cdn.chanhtuoi.com/uploads/2021/11/anh-bau-troi-45.jpg',
			name: 'Tên sự kiện Tên sự kiện Tên sự kiện Tên sự kiện',
			content: 'sự kiện này đã bị hủy bỏ',
		},
		isWatched: false,
		typenotification: 1,
		typenotificationData: {
			idNotification: 1,
			nameNotification: 'hệ thống',
		},
	},
]
