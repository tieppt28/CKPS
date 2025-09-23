"use strict";

/* global exports */

var symbols = [{
  "name": "A32",
  "description": "Công ty 32",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AAA",
  "description": "An Phát Bioplastics",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "AAM",
  "description": "Thủy sản Mekong",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "AAS",
  "description": "Chứng khoán SmartInvest",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AAT",
  "description": "Tiên Sơn Thanh Hóa",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "AAV",
  "description": "Việt Tiên Sơn Địa ốc",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ABB",
  "description": "Ngân hàng An Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ABC",
  "description": "Truyền thông VMG",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ABI",
  "description": "Bảo hiểm NH Nông nghiệp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ABR",
  "description": "Đầu tư Nhãn Hiệu Việt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ABS",
  "description": "DV Nông nghiệp Bình Thuận",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ABT",
  "description": "Thủy sản Bến Tre",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ACB",
  "description": "Ngân hàng Á Châu",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ACC",
  "description": "ĐT & XD Bình Dương ACC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ACE",
  "description": "Bê tông An Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ACG",
  "description": "Gỗ An Cường",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ACL",
  "description": "Thủy sản Cửu Long An Giang",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ACM",
  "description": "Khoáng sản Á Cường",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ACS",
  "description": "Xây lắp Thương mại 2",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ACV",
  "description": "Cảng Hàng không VN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ADC",
  "description": "Mĩ thuật & Truyền thông",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ADG",
  "description": "Clever Group",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ADP",
  "description": "Sơn Á Đông",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ADS",
  "description": "Dệt sợi DAMSAN",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "AFX",
  "description": "XNK Nông sản An Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AG1",
  "description": "Công ty 28.1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AGB",
  "description": "Công ty Bình Phú",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AGE",
  "description": "Môi trường Đô thị An Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AGF",
  "description": "Thủy sản An Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AGG",
  "description": "Bất động sản An Gia",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "AGM",
  "description": "Xuất nhập khẩu An Giang",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "AGP",
  "description": "Dược AGIMEXPHARM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AGR",
  "description": "Chứng khoán Agriseco",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "AGX",
  "description": "AGREX SAIGON",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AIC",
  "description": "Bảo hiểm Hàng không",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ALT",
  "description": "Văn hóa Tân Bình",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ALV",
  "description": "Xây dựng ALVICO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AMC",
  "description": "Khoáng sản Á Châu",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "AMD",
  "description": "FLC Stone",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "AME",
  "description": "Alphanam Cơ điện",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "AMP",
  "description": "Dược Armephaco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AMS",
  "description": "Cơ khí Xây dựng AMECC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AMV",
  "description": "Dược - Thiết bị Y tế Việt Mỹ",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ANT",
  "description": "Rau quả thực phẩm An Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ANV",
  "description": "Thủy sản Nam Việt",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "APC",
  "description": "Chiếu xạ An Phú",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "APF",
  "description": "Nông sản Quảng Ngãi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "APG",
  "description": "Chứng khoán APG",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "APH",
  "description": "Tập đoàn An Phát Holdings",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "API",
  "description": "APEC INVESTMENT",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "APL",
  "description": "Cơ khí Thiết bị áp lực VVMI",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "APP",
  "description": "Phụ gia & Sản phẩm dầu mỏ",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "APS",
  "description": "Chứng khoán Châu Á - TBD",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "APT",
  "description": "Thủy Hải sản Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ARM",
  "description": "Xuất nhập khẩu Hàng không",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ART",
  "description": "Chứng khoán BOS",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ASA",
  "description": "Hàng tiêu dùng ASA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ASG",
  "description": "Tập đoàn ASG",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ASM",
  "description": "Tập đoàn Sao Mai",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ASP",
  "description": "Dầu khí An Pha",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "AST",
  "description": "Dịch vụ Hàng không Taseco",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ATA",
  "description": "NTACO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ATB",
  "description": "An Thịnh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ATG",
  "description": "An Trường An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ATP",
  "description": "T.Mại & DV An Thành",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ATS",
  "description": "Suất ăn Công nghiệp Atesco",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "AUM",
  "description": "Vinacafe Sơn Thành",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AVC",
  "description": "Thủy điện A Vương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AVF",
  "description": "Thủy sản Việt An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "B82",
  "description": "Công ty 482",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BAB",
  "description": "Ngân hàng Bắc Á",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BAF",
  "description": "Nông nghiệp BAF Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BAL",
  "description": "Bao bì BALPAC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BAM",
  "description": "KS & Luyện kim Bắc Á",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BAX",
  "description": "Thống Nhất",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BBC",
  "description": "Bánh kẹo Bibica",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BBH",
  "description": "Bao bì Hoàng Thạch",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BBM",
  "description": "Bia Hà Nội - Nam Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BBS",
  "description": "Bao bì Xi măng Bút Sơn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BBT",
  "description": "Bông Bạch Tuyết",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BCA",
  "description": "Công ty B.C.H",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BCB",
  "description": "Công ty 397",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BCC",
  "description": "Xi măng Bỉm Sơn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BCE",
  "description": "Xây dựng & GT Bình Dương",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BCF",
  "description": "Thực phẩm Bích Chi",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BCG",
  "description": "Bamboo Capital",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BCM",
  "description": "Becamex IDC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BCO",
  "description": "Xây dựng Bình Phước",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BCP",
  "description": "Dược Enlie",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BCV",
  "description": "DLTM Bằng Giang Cao Bằng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BDB",
  "description": "Sách Bình Định",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BDG",
  "description": "May mặc Bình Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BDT",
  "description": "Vật liệu xây dựng Đồng Tháp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BDW",
  "description": "Cấp thoát nước Bình Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BED",
  "description": "Sách Đà Nẵng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BEL",
  "description": "Điện tử Biên Hoà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BFC",
  "description": "Phân bón Bình Điền",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BGT",
  "description": "CT GT Bà Rịa - Vũng Tàu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BGW",
  "description": "Nước sạch Bắc Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BHA",
  "description": "Thủy điện Bắc Hà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BHC",
  "description": "Bê tông Biên Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BHG",
  "description": "Chè Biển Hồ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BHK",
  "description": "Bia Hà Nội - Kim Bài",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BHN",
  "description": "HABECO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BHP",
  "description": "Bia Hà Nội - Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BHT",
  "description": "Đầu tư Xây dựng Bạch Đằng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "Bia",
  "description": "Bia",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BIC",
  "description": "Bảo hiểm BIDV",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BID",
  "description": "Ngân hàng BIDV",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BIG",
  "description": "BIG Invest Group",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BII",
  "description": "PT Công nghiệp Bảo Thư",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BIO",
  "description": "Vắc xin Sinh phẩm Nha Trang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BKC",
  "description": "Khoáng sản Bắc Kạn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BKG",
  "description": "Đầu tư BKG Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BKH",
  "description": "Bánh mứt kẹo Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BLF",
  "description": "Thủy sản Bạc Liêu",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BLI",
  "description": "Bảo hiểm Bảo Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BLN",
  "description": "Xe buýt Liên Ninh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BLT",
  "description": "Lương Thực Bình Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BLU",
  "description": "Dịch vụ Đô thị Bạc Liêu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BLW",
  "description": "Cấp nước Bạc Liêu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BMC",
  "description": "Khoáng sản Bình Định",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BMD",
  "description": "Môi trường DVĐT Bình Thuận",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BMF",
  "description": "VLXD & Chất đốt Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BMG",
  "description": "May Bình Minh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BMI",
  "description": "Bảo hiểm Bảo Minh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BMJ",
  "description": "Khoáng sản Miền Đông AHP",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BMN",
  "description": "Công ty 715",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BMP",
  "description": "Nhựa Bình Minh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BMS",
  "description": "Chứng khoán Bảo Minh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BMV",
  "description": "Bột mỳ Vinafood 1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BNA",
  "description": "Đầu tư Sản xuất Bảo Ngọc",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BNW",
  "description": "Nước sạch Bắc Ninh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BOT",
  "description": "BOT Cầu Thái Hà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BPC",
  "description": "Bao bì Bỉm Sơn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BPT",
  "description": "Cấp nước Phú Thọ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BPW",
  "description": "Cấp thoát nước Bình Phước",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BQB",
  "description": "Bia Hà Nội - Quảng Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BRC",
  "description": "Cao su Bến Thành",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BRM",
  "description": "Quản lý cầu đường Đà Nẵng",
  "type": "stock",
  "exchange": "OTC"
},
{
  "name": "BRR",
  "description": "Cao su Bà Rịa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BRS",
  "description": "Dịch vụ Đô thị Bà Rịa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BRV",
  "description": "Bia Rượu NGK Viger",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BSA",
  "description": "Thủy điện Buôn Đôn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BSC",
  "description": "Dịch vụ Bến Thành",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BSD",
  "description": "Bia Rượu Sài Gòn Đồng Xuân",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BSG",
  "description": "Xe khách Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BSH",
  "description": "Bia Sài Gòn - Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BSI",
  "description": "Chứng khoán BIDV",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BSL",
  "description": "Bia Sài Gòn - Sông Lam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BSP",
  "description": "Bia Sài Gòn - Phú Thọ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BSQ",
  "description": "Bia Sài Gòn - Quảng Ngãi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BSR",
  "description": "Lọc - Hóa dầu Bình Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BST",
  "description": "BISATHICO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BT1",
  "description": "Bảo vệ thực vật 1 Trung ương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BT6",
  "description": "Bê tông 6",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BTB",
  "description": "Bia Hà Nội - Thái Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BTD",
  "description": "Bê tông ly tâm Thủ Đức",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BTG",
  "description": "Bao bì Tiền Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BTH",
  "description": "Biến thế Vật liệu điện HN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BTN",
  "description": "Gạch Tuy Nen Bình Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BTP",
  "description": "Nhiệt điện Bà Rịa",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BTS",
  "description": "Xi măng Bút Sơn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BTT",
  "description": "T.Mại & DV Bến Thành",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BTU",
  "description": "Công trình Đô thị Bến Tre",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BTV",
  "description": "Dịch vụ Du lịch Bến Thành",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BTW",
  "description": "Cấp nước Bến Thành",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BUD",
  "description": "Khoa học Công nghệ VN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BVB",
  "description": "Ngân hàng Bản Việt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BVG",
  "description": "Đầu tư BVG",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BVH",
  "description": "Tập đoàn Bảo Việt",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BVL",
  "description": "BV Land",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BVN",
  "description": "Bông Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BVS",
  "description": "Chứng khoán Bảo Việt",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BWA",
  "description": "Cấp thoát nước Bảo Lộc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BWE",
  "description": "Nước Môi trường Bình Dương",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "BWS",
  "description": "Cấp nước Bà Rịa - Vũng Tàu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BXH",
  "description": "Bao bì Xi măng Hải Phòng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "BXT",
  "description": "BQL & Điều hành Bến xe tàu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "C12",
  "description": "Cầu 12",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "C21",
  "description": "Thế kỷ 21",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "C22",
  "description": "Công ty 22",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "C32",
  "description": "CIC39",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "C47",
  "description": "Xây dựng 47",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "C4G",
  "description": "Tập Đoàn Cienco4",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "C69",
  "description": "Xây dựng 1369",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "C92",
  "description": "Xây dựng & Đầu tư 492",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CAB",
  "description": "Truyền hình Cáp Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CAD",
  "description": "Thủy sản Cadovimex",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CAF",
  "description": "AGRIMEXCO CAMAU",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CAG",
  "description": "Cảng An Giang",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CAN",
  "description": "Đồ hộp Hạ Long",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CAP",
  "description": "Lâm nông sản Yên Bái",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CAT",
  "description": "Thủy sản Cà Mau",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CAV",
  "description": "Dây cáp điện Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CBC",
  "description": "Chè Bàu Cạn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CBI",
  "description": "Gang thép Cao Bằng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CBS",
  "description": "Mía đường Cao Bằng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CBV",
  "description": "CTCBIO Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CC1",
  "description": "TCT Xây dựng số 1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CC4",
  "description": "Đầu tư & Xây dựng số 4",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CCA",
  "description": "XNK Thuỷ sản Cần Thơ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CCI",
  "description": "CIDICO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CCL",
  "description": "ĐT & PT Dầu khí Cửu Long",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CCM",
  "description": "Xi măng Cần Thơ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CCP",
  "description": "Cảng Cửa Cấm",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CCR",
  "description": "Cảng Cam Ranh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CCT",
  "description": "Cảng Cần Thơ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CCV",
  "description": "Xây dựng CN & Đô thị VN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CDC",
  "description": "Chương Dương Corp",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CDG",
  "description": "Vật liệu xây dựng Cầu Đuống",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CDH",
  "description": "CTCC & DV Du lịch HP",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CDN",
  "description": "Cảng Đà Nẵng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CDO",
  "description": "Phát triển Đô thị CDCC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CDP",
  "description": "Dược Trung ương Codupha",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CDR",
  "description": "Xây dựng Cao su Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CE1",
  "description": "Thiết bị Công nghiệp CIE1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CEE",
  "description": "Xây dựng Hạ tầng CII",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CEG",
  "description": "XD & Thiết bị Công nghiệp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CEN",
  "description": "CENCON Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CEO",
  "description": "Tập đoàn CEO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CET",
  "description": "Tech - Vina",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CFM",
  "description": "Đầu tư CFM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CFV",
  "description": "Cà phê Thắng Lợi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CGC",
  "description": "T.Mại & Dịch vụ Cần Giờ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CGL",
  "description": "Thương mại Gia Lai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CGV",
  "description": "Sành sứ Thủy tinh Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CH5",
  "description": "Xây dựng số 5 Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CHC",
  "description": "Nội thất Cẩm Hà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CHP",
  "description": "Thủy điện Miền Trung",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CHS",
  "description": "Chiếu sáng TP.HCM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CI5",
  "description": "Đầu tư Xây dựng số 5",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CIA",
  "description": "Dịch vụ Sân Bay Cam Ranh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CID",
  "description": "XD & PT Cơ sở Hạ tầng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CIG",
  "description": "Xây dựng COMA 18",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CII",
  "description": "Hạ tầng Kỹ thuật TP.HCM",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CIP",
  "description": "Xây lắp & SX Công nghiệp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CJC",
  "description": "Cơ điện Miền Trung",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CK8",
  "description": "Cơ khí 120",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CKA",
  "description": "Cơ khí An Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CKD",
  "description": "Đông Anh Licogi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CKG",
  "description": "Xây dựng Kiên Giang",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CKM",
  "description": "Cơ khí Mỏ Việt Bắc",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CKV",
  "description": "CokyVina",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CLC",
  "description": "Thuốc lá Cát Lợi",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CLG",
  "description": "Cotec Land",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CLH",
  "description": "Xi măng La Hiên",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CLL",
  "description": "Cảng Cát Lái",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CLM",
  "description": "XNK Than - Vinacomin",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CLW",
  "description": "Cấp nước Chợ Lớn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CLX",
  "description": "XNK & Đầu tư Chợ Lớn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CMC",
  "description": "Đầu tư CMC",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CMD",
  "description": "VLXD & Nội thất TP.HCM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CMF",
  "description": "Thực phẩm Cholimex",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CMG",
  "description": "Tập đoàn CMC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CMI",
  "description": "CMISTONE Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CMK",
  "description": "Cơ khí Mạo Khê - Vinacomin",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CMN",
  "description": "Colusa - Miliket",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CMP",
  "description": "Cảng Chân Mây",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CMS",
  "description": "CM Vietnam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CMT",
  "description": "INFONET",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CMV",
  "description": "Thương nghiệp Cà Mau",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CMW",
  "description": "Cấp nước Cà Mau",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CMX",
  "description": "CAMIMEX Group",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CNA",
  "description": "Đầu tư phát triển Chè Nghệ An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CNC",
  "description": "Công nghệ cao Traphaco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CNG",
  "description": "CNG Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CNN",
  "description": "Xây dựng Coninco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CNT",
  "description": "Xây dựng & Kinh doanh Vật tư",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "COM",
  "description": "Vật tư Xăng dầu",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CPA",
  "description": "Cà phê Phước An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CPC",
  "description": "Thuốc sát trùng Cần Thơ",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CPH",
  "description": "Phục vụ Mai táng Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CPI",
  "description": "Đầu tư Cảng Cái Lân",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CQN",
  "description": "Cảng Quảng Ninh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CQT",
  "description": "Xi măng Quán Triều VVMI",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CRC",
  "description": "Create Capital Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CRE",
  "description": "Bất động sản Thế Kỷ",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CSC",
  "description": "Tập đoàn COTANA",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CSI",
  "description": "Chứng khoán Kiến thiết VN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CSM",
  "description": "Cao su Miền Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CST",
  "description": "Than Cao Sơn - TKV",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CSV",
  "description": "Hóa chất Cơ bản miền Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CT3",
  "description": "Xây dựng công trình 3",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CT5",
  "description": "Công ty 319.5",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CT6",
  "description": "Công trình 6",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CTA",
  "description": "Xây dựng Vinavico",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CTB",
  "description": "Bơm Hải Dương",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CTC",
  "description": "Gia Lai CTC",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CTD",
  "description": "Xây dựng Coteccons",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CTF",
  "description": "City Auto",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CTG",
  "description": "VietinBank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CTI",
  "description": "Cường Thuận IDICO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CTN",
  "description": "VINAVICO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CTP",
  "description": "Minh Khang CTP",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CTR",
  "description": "Công trình Viettel",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CTS",
  "description": "Chứng khoán VietinBankSc",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CTT",
  "description": "Chế tạo máy Vinacomin",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CTW",
  "description": "Cấp thoát nước Cần Thơ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "CTX",
  "description": "CONSTREXIM",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CVN",
  "description": "Vinam Group",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CVT",
  "description": "CMC JSC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CX8",
  "description": "Constrexim số 8",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CYC",
  "description": "Gạch men Chang YIH",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "D11",
  "description": "Địa ốc 11",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "D2D",
  "description": "Phát triển Đô thị số 2",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DAC",
  "description": "Viglacera Đông Anh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DAD",
  "description": "Phát triển Giáo dục Đà Nẵng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DAE",
  "description": "Sách Giáo dục Đà Nẵng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DAG",
  "description": "Nhựa Đông Á",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DAH",
  "description": "Khách sạn Đông Á",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DAN",
  "description": "Dược Danapha",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DAR",
  "description": "Xe lửa Dĩ An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DAS",
  "description": "Thiết bị Dầu khí Đà Nẵng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DAT",
  "description": "ĐT Du lịch & PT Thủy sản",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DBC",
  "description": "Tập đoàn DABACO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DBD",
  "description": "Dược - Thiết bị Y tế Bình Định",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DBH",
  "description": "Đường bộ Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DBM",
  "description": "BAMEPHARM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DBT",
  "description": "Dược Bến Tre",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DBV",
  "description": "Sửa chữa Đường bộ Vĩnh Phúc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DBW",
  "description": "Cấp nước Điện Biên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DC1",
  "description": "ĐTPT Xây dựng số 1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DC2",
  "description": "DIC Số 2",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DC4",
  "description": "Xây dựng DIC Holdings",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DCF",
  "description": "Xây dựng & Thiết kế số 1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DCG",
  "description": "May Đáp Cầu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DCH",
  "description": "Địa chính Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DCL",
  "description": "Dược Cửu Long",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DCM",
  "description": "Đạm Cà Mau",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DCR",
  "description": "Gạch men COSEVCO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DCS",
  "description": "Đại Châu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DCT",
  "description": "Tấm lợp VLXD Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DDG",
  "description": "Đầu tư CN XNK Đông Dương",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DDH",
  "description": "Đảm bảo GTĐT Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DDM",
  "description": "Hàng hải Đông Đô",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DDN",
  "description": "Dược - Thiết bị Y tế Đà Nẵng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DDV",
  "description": "DAP - VINACHEM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DFC",
  "description": "Xích líp Đông Anh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DFF",
  "description": "Tập đoàn Đua Fat",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DGC",
  "description": "Hóa chất Đức Giang",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DGT",
  "description": "Công trình GT Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DGW",
  "description": "Thế Giới Số",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DHA",
  "description": "Hóa An",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DHB",
  "description": "Đạm Hà Bắc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DHC",
  "description": "Đông Hải Bến Tre",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DHD",
  "description": "Dược - Vật tư Y tế Hải Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DHG",
  "description": "Dược Hậu Giang",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DHM",
  "description": "Khoáng sản Dương Hiếu",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DHN",
  "description": "Dược Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DHP",
  "description": "Điện cơ Hải Phòng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DHQ",
  "description": "Duyên hải Quảng Ninh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DHT",
  "description": "Dược phẩm Hà Tây",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DIC",
  "description": "Đầu tư & Thương mại DIC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DID",
  "description": "DIC - Đồng Tiến",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DIG",
  "description": "DIC Corp",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DIH",
  "description": "Phát triển Xây dựng Hội An",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DKC",
  "description": "Chợ Lạng Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DKH",
  "description": "TT Đăng kiểm PTGT Thủy bộ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DL1",
  "description": "Bến xe Đức Long Gia Lai",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DLD",
  "description": "Du lịch Đắk Lắk",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DLG",
  "description": "Đức Long Gia Lai",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DLM",
  "description": "Chiếu sáng công cộng Đà Nẵng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DLR",
  "description": "Địa ốc Đà Lạt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DLT",
  "description": "Du lịch & T.Mại - Vinacomin",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DM7",
  "description": "Dệt may 7",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DMC",
  "description": "Dược phẩm DOMESCO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DMH",
  "description": "Dược Minh Hải",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DMN",
  "description": "Domenal",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DNA",
  "description": "Điện nước An Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DNB",
  "description": "Sách & Thiết bị TH Đắk Nông",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DNC",
  "description": "Điện nước Hải Phòng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DND",
  "description": "Xây dựng & Vật liệu Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DNE",
  "description": "Môi trường Đô thị Đà Nẵng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DNH",
  "description": "Thủy điện EVNHPC DHD",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DNL",
  "description": "Logistics Cảng Đà Nẵng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DNM",
  "description": "Y tế Danameco",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DNN",
  "description": "Cấp nước Đà Nẵng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DNP",
  "description": "Nhựa Đồng Nai",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DNT",
  "description": "Du lịch Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DNW",
  "description": "Cấp nước Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DO3",
  "description": "Kinh doanh Địa ốc 3",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DOC",
  "description": "Vật tư Nông nghiệp Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DOP",
  "description": "Vận tải Xăng dầu Đồng Tháp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DP1",
  "description": "Dược phẩm Trung ương CPC1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DP2",
  "description": "Dược phẩm Trung ương 2",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DP3",
  "description": "Dược Phẩm Trung ương 3",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DPC",
  "description": "Nhựa Đà Nẵng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DPD",
  "description": "Cao su Đồng Phú Đắk Nông",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DPG",
  "description": "Đạt Phương",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DPH",
  "description": "Dược phẩm Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DPM",
  "description": "Đạm Phú Mỹ",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DPP",
  "description": "Dược Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DPR",
  "description": "Cao su Đồng Phú",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DPS",
  "description": "Đầu tư Phát triển Sóc Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DQC",
  "description": "Bóng đèn Điện Quang",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DRC",
  "description": "Cao su Đà Nẵng",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DRG",
  "description": "Cao su Đắk Lắk",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DRH",
  "description": "DRH Holdings",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DRI",
  "description": "Đầu tư Cao su Đắk Lắk",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DRL",
  "description": "Thủy điện - Điện lực 3",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DS3",
  "description": "Quản lý Đường sông số 3",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DSC",
  "description": "Chứng khoán Đà Nẵng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DSG",
  "description": "Kính Viglacera Đáp Cầu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DSN",
  "description": "Công viên nước Đầm Sen",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DSP",
  "description": "Dịch vụ Du lịch Phú Thọ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DST",
  "description": "Đầu tư Sao Thăng Long",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DSV",
  "description": "Đường sắt Vĩnh Phú",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DT4",
  "description": "Bảo trì đường thủy nội địa 4",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DTA",
  "description": "Bất động sản Đệ Tam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DTB",
  "description": "Công trình Đô thị Bảo Lộc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DTC",
  "description": "Viglacera Đông Triều",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DTD",
  "description": "Đầu tư Phát triển Thành Đạt",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DTE",
  "description": "Đại Trường Thành Holdings",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DTF",
  "description": "NGK Dona Newtower",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DTG",
  "description": "Dược Tipharco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DTI",
  "description": "Đầu tư Đức Trung",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DTJ",
  "description": "ĐT XD Viễn thông Đồng Tháp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DTK",
  "description": "Vinacomin Power",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DTL",
  "description": "Đại Thiên Lộc",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DTN",
  "description": "Diêm Thống Nhất",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DTP",
  "description": "Dược phẩm CPC1 Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DTT",
  "description": "Kỹ nghệ & Nhựa Đô Thành",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DTV",
  "description": "PT Điện Nông thôn Trà Vinh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DUS",
  "description": "Dịch vụ Đô thị Đà Lạt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DVC",
  "description": "TM Dịch vụ Cảng Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DVG",
  "description": "Tập đoàn Sơn Đại Việt",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DVN",
  "description": "TCT Dược Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DVP",
  "description": "Cảng Đình Vũ",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DVW",
  "description": "DV & XD Cấp nước Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DWC",
  "description": "Cấp nước Đắk Lắk",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DWS",
  "description": "Cấp nước Đồng Tháp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DX2",
  "description": "Đầu tư & Xây dựng 319.2",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DXG",
  "description": "Địa ốc Đất Xanh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DXL",
  "description": "Du lịch & XNK Lạng Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DXP",
  "description": "Cảng Đoạn Xá",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DXS",
  "description": "Dịch vụ BĐS Đất Xanh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DXV",
  "description": "Xi măng & VLXD Đà Nẵng",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DZM",
  "description": "Chế tạo máy Dzĩ An",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "E12",
  "description": "Xây dựng Điện VNECO 12",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "E1VFVN30",
  "description": "Quỹ ETF VFMVN30",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "E29",
  "description": "Đầu tư XD & Kỹ thuật 29",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "EAD",
  "description": "Điện lực Đắk Lắk",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "EBS",
  "description": "Sách Giáo dục Hà Nội",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ECI",
  "description": "Bản đồ Tranh ảnh giáo dục",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "EFI",
  "description": "Tài chính Giáo dục",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "EIB",
  "description": "Eximbank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "EIC",
  "description": "EVN Quốc Tế",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "EID",
  "description": "Phát triển Giáo dục Hà Nội",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "EIN",
  "description": "Đầu tư - TM - DV Điện lực",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ELC",
  "description": "ELCOM",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "EMC",
  "description": "Cơ điện Thủ Đức",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "EME",
  "description": "Điện Cơ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "EMG",
  "description": "Thiết bị Phụ tùng Cơ điện",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "EMS",
  "description": "Chuyển phát nhanh Bưu điện",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "EPC",
  "description": "Cà Phê Ea Pốk",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "EPH",
  "description": "Xuất bản giáo dục Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ESL",
  "description": "Tiếp vận Đông Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "EVE",
  "description": "Everpia",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "EVF",
  "description": "Tài chính Điện lực",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "EVG",
  "description": "Tập đoàn Everland",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "EVS",
  "description": "Chứng khoán Everest",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "FBA",
  "description": "Tập đoàn Quốc tế FBA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FBC",
  "description": "Cơ khí Phổ Yên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FCC",
  "description": "Liên hợp Thực phẩm",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FCM",
  "description": "Khoáng sản FECON",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FCN",
  "description": "FECON",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FCS",
  "description": "Lương thực TP. HCM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FDC",
  "description": "FIDECO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FDG",
  "description": "Thủy sản Docimexco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FGL",
  "description": "Cà Phê Gia Lai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FHH",
  "description": "FLC Homes",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FHN",
  "description": "XNK Lương thực Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FHS",
  "description": "Phát hành sách FAHASA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FIC",
  "description": "Vật liệu Xây dựng Số 1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FID",
  "description": "ĐT & PT Doanh nghiệp VN",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "FIR",
  "description": "Địa ốc First Real",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FIT",
  "description": "Tập đoàn F.I.T",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FLC",
  "description": "Tập đoàn FLC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FMC",
  "description": "Thủy sản Sao Ta",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FOC",
  "description": "FPT Online",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FOX",
  "description": "FPT Telecom",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FPT",
  "description": "FPT Corp",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FRC",
  "description": "FOREXCO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FRM",
  "description": "Lâm nghiệp Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FRT",
  "description": "Bán lẻ FPT",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FSO",
  "description": "Đóng tàu thủy sản VN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FT1",
  "description": "Phụ tùng máy số 1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FTI",
  "description": "Công nghiệp - T.Mại Hữu Nghị",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FTM",
  "description": "Phát triển Đức Quân",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FTS",
  "description": "Chứng khoán FPT",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUCTVGF2",
  "description": "QĐT Tăng trưởng Thiên Việt 2",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUCTVGF3",
  "description": "Quỹ Tăng trưởng Thiên Việt 3",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUCVREIT",
  "description": "QĐT BĐS Techcom VN",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUEIP100",
  "description": "ETF IPAAM VN100",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUEKIV30",
  "description": "KIM GROWTH VN30 ETF",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUEMAV30",
  "description": "CCQ ETF MAFM VN30",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUESSV30",
  "description": "Quỹ ETF SSIAM VN30",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUESSV50",
  "description": "Quỹ ETF SSIAM VNX50",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUESSVFL",
  "description": "Quỹ ETF SSIAM VNFIN LEAD",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUEVFVND",
  "description": "Quỹ ETF VFMVN DIAMOND",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUEVN100",
  "description": "Quỹ ETF VINACAPITAL VN100",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "G20",
  "description": "Đầu tư Dệt may G.Home",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "G36",
  "description": "Tổng Công ty 36",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GAB",
  "description": "ĐT Khai khoáng & QLTS FLC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GAS",
  "description": "PV Gas",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GCB",
  "description": "PETEC Bình Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GDT",
  "description": "Gỗ Đức Thành",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GDW",
  "description": "Cấp nước Gia Định",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "GE2",
  "description": "Tổng Công ty Phát điện 2",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GEE",
  "description": "Thiết bị điện GELEX",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GEG",
  "description": "Điện Gia Lai",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GER",
  "description": "Thể thao Ngôi sao Geru",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GEX",
  "description": "Thiết bị điện Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GGG",
  "description": "Ô tô Giải Phóng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GH3",
  "description": "Công trình Giao thông Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GHC",
  "description": "Thủy điện Gia Lai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GIC",
  "description": "ĐT Dịch vụ & PT Xanh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "GIL",
  "description": "Xuất nhập khẩu Bình Thạnh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GKM",
  "description": "Khang Minh Group",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "GLC",
  "description": "Vàng Lào Cai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GLT",
  "description": "Kỹ thuật điện Toàn Cầu",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "GLW",
  "description": "Cấp nước Gia Lai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GMA",
  "description": "Enteco Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "GMC",
  "description": "May Sài Gòn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GMD",
  "description": "Gemadept",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GMH",
  "description": "Minh Hưng Quảng Trị",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GMX",
  "description": "Gạch ngói Mỹ Xuân",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "GND",
  "description": "Gạch ngói Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GQN",
  "description": "Giống Thủy sản Quảng Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GSM",
  "description": "Thủy điện Hương Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GSP",
  "description": "Gas Shipping",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GTA",
  "description": "Gỗ Thuận An",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GTD",
  "description": "Giầy Thượng Đình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GTH",
  "description": "Xây dựng GT Thừa Thiên Huế",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GTK",
  "description": "Giầy Thụy Khuê",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GTM",
  "description": "Tập đoàn Tân Mai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GTN",
  "description": "GTNFOODS",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GTS",
  "description": "Công trình Giao thông Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GTT",
  "description": "Thuận Thảo Group",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GVR",
  "description": "Tập đoàn CN Cao su VN",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "GVT",
  "description": "Giấy Việt Trì",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "H11",
  "description": "Xây dựng HUD101",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HAB",
  "description": "Sách & Thiết bị TH Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HAC",
  "description": "Chứng khoán Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HAD",
  "description": "Bia Hà Nội - Hải Dương",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HAF",
  "description": "Thực phẩm Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HAG",
  "description": "Hoàng Anh Gia Lai",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HAH",
  "description": "Vận tải & Xếp dỡ Hải An",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HAI",
  "description": "Nông Dược HAI",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HAM",
  "description": "HAMACO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HAN",
  "description": "Xây dựng Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HAP",
  "description": "Tập đoàn Hapaco",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HAR",
  "description": "BĐS An Dương Thảo Điền",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HAS",
  "description": "Hacisco",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HAT",
  "description": "Thương mại Bia Hà Nội",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HAV",
  "description": "Rượu Hapro",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HAW",
  "description": "Nước sạch & VSMT Hậu Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HAX",
  "description": "Ô tô Hàng Xanh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HBC",
  "description": "Tập đoàn Xây dựng Hòa Bình",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HBD",
  "description": "Bao bì PP Bình Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HBH",
  "description": "HABECO Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HBS",
  "description": "Chứng khoán Hòa Bình",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HC1",
  "description": "Xây dựng số 1 Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HC3",
  "description": "Xây dựng số 3 Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HCB",
  "description": "Dệt may 29/3",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HCC",
  "description": "Bê tông Hòa Cầm",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HCD",
  "description": "Sản xuất & Thương mại HCD",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HCI",
  "description": "Đầu tư - Xây dựng Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HCM",
  "description": "Chứng khoán TP.HCM",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HCT",
  "description": "TM DV VT Xi măng HP",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HD2",
  "description": "Đầu tư Phát triển nhà HUD 2",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HD6",
  "description": "Phát triển nhà số 6 Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HD8",
  "description": "PT Nhà & Đô thị HUD8",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HDA",
  "description": "Hãng sơn Đông Á",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HDB",
  "description": "HDBank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HDC",
  "description": "PT Nhà Bà Rịa - Vũng Tàu",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HDG",
  "description": "Xây dựng Hà Đô",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HDM",
  "description": "Dệt - May Huế",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HDO",
  "description": "Hưng Đạo Container",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HDP",
  "description": "Dược Hà Tĩnh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HDS",
  "description": "Giống cây trồng Hải Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HDV",
  "description": "Hóa Dược Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HDW",
  "description": "Nước sạch Hải Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HEC",
  "description": "Tư vấn Xây dựng Thủy lợi II",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HEJ",
  "description": "Tư vấn Xây dựng Thủy lợi VN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HEM",
  "description": "Chế tạo Điện cơ Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HEP",
  "description": "Công trình Đô thị Huế",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HES",
  "description": "Dịch vụ Giải trí Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HEV",
  "description": "Sách Đại học - Dạy nghề",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HFB",
  "description": "Công trình Cầu phà TP. HCM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HFC",
  "description": "Xăng dầu HFC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HFX",
  "description": "Xuất nhập khẩu Thanh Hà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HGA",
  "description": "Giống Nông nghiệp Hậu Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HGC",
  "description": "Quy hoạch K.Trúc Hậu Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HGM",
  "description": "Khoáng sản Hà Giang",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HGR",
  "description": "KT Tài nguyên & Môi trường",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HGT",
  "description": "Du lịch Hương Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HGW",
  "description": "Cấp thoát nước Hậu Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HHC",
  "description": "Bánh kẹo Hải Hà",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HHG",
  "description": "Vận tải Hoàng Hà",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HHN",
  "description": "Vận tải & DV Hàng hóa HN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HHP",
  "description": "Giấy Hoàng Hà Hải Phòng",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HHR",
  "description": "Đường sắt Hà Hải",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HHS",
  "description": "Đầu tư Dịch vụ Hoàng Huy",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HHV",
  "description": "Hạ tầng Giao thông Đèo Cả",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HID",
  "description": "Halcom Vietnam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HIG",
  "description": "Tập đoàn HIPT",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HII",
  "description": "An Tiến Industries",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HJC",
  "description": "Nguyên liệu thuốc lá Hòa Việt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HJS",
  "description": "Thủy điện Nậm Mu",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HKB",
  "description": "Thực phẩm Hà Nội - Kinh Bắc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HKP",
  "description": "Bao bì Hà Tiên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HKT",
  "description": "Đầu tư Ego Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HLA",
  "description": "Hữu Liên Á Châu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HLB",
  "description": "Bia & Nước giải khát Hạ Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HLC",
  "description": "Than Hà Lầm",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HLD",
  "description": "Bất động sản HUDLAND",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HLE",
  "description": "Điện chiếu sáng Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HLG",
  "description": "Tập đoàn Hoàng Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HLR",
  "description": "Đường sắt Hà Lạng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HLS",
  "description": "Sứ Hoàng Liên Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HLT",
  "description": "Dệt may Hoàng Thị Loan",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HLY",
  "description": "Viglacera Hạ Long I",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HMC",
  "description": "Kim khí TP.HCM",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HMG",
  "description": "Kim Khí Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HMH",
  "description": "Tập đoàn Hải Minh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HMR",
  "description": "Đá Hoàng Mai",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HMS",
  "description": "Xây dựng Bảo tàng HCM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HNA",
  "description": "Thủy điện Hủa Na",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HNB",
  "description": "Bến xe Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HNC",
  "description": "Xi măng Hữu Nghị",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HND",
  "description": "Nhiệt điện Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HNE",
  "description": "Hanel",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HNF",
  "description": "Bánh kẹo Hữu Nghị",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HNG",
  "description": "Nông nghiệp Quốc tế HAGL",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HNI",
  "description": "May Hữu Nghị",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HNM",
  "description": "HANOIMILK",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HNP",
  "description": "Hanel Xốp Nhựa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HNR",
  "description": "Cồn Rượu Nước giải khát HN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HNT",
  "description": "Xe điện Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HNX",
  "description": "HNX",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HOM",
  "description": "Xi măng VICEM Hoàng Mai",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HOT",
  "description": "Du lịch - Dịch vụ Hội An",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HPB",
  "description": "Bao bì PP",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HPD",
  "description": "Thủy điện Đăk Đoa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HPG",
  "description": "Tập đoàn Hòa Phát",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HPH",
  "description": "Hóa Chất Hưng Phát Hà Bắc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HPI",
  "description": "Khu công nghiệp Hiệp Phước",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HPM",
  "description": "Khoáng sản Hoàng Phúc",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HPP",
  "description": "Sơn Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HPT",
  "description": "DV Công nghệ Tin học HPT",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HPW",
  "description": "Cấp nước Hải Phòng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HPX",
  "description": "Đầu tư Hải Phát",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HQC",
  "description": "Địa ốc Hoàng Quân",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HRB",
  "description": "Harec Đầu tư & Thương Mại",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HRC",
  "description": "Cao su Hòa Bình",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HRT",
  "description": "Vận tải đường sắt Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HSA",
  "description": "HESTIA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HSG",
  "description": "Tập đoàn Hoa Sen",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HSI",
  "description": "Phân bón Hóa sinh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HSL",
  "description": "Thực phẩm Hồng Hà",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HSM",
  "description": "HANOSIMEX",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HSP",
  "description": "Sơn Tổng hợp Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HSV",
  "description": "Gang Thép Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HT1",
  "description": "Xi măng Hà Tiên 1",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HT9",
  "description": "Phát triển hạ tầng 319",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HTC",
  "description": "Thương mại Hóc Môn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HTE",
  "description": "Kinh doanh Điện lực TP. HCM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HTG",
  "description": "Dệt may Hòa Thọ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HTH",
  "description": "Hoa tiêu Hàng hải - TKV",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HTI",
  "description": "Phát triển Hạ tầng IDICO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HTK",
  "description": "Đăng kiểm Xe cơ giới HD",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HTL",
  "description": "Ô tô Trường Long",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HTM",
  "description": "Thương mại Hà Nội - Hapro",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HTN",
  "description": "Hưng Thịnh Incons",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HTP",
  "description": "In Sách giáo khoa Hòa Phát",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HTR",
  "description": "Đường sắt Hà Thái",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HTS",
  "description": "Thép Hương Thịnh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HTT",
  "description": "Thương mại Hà Tây",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HTV",
  "description": "Logistics Vicem",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HTW",
  "description": "Cấp nước Hà Tĩnh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HU1",
  "description": "Xây dựng HUD1",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HU3",
  "description": "Xây dựng HUD3",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HU4",
  "description": "Đầu tư & Xây dựng HUD4",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HU6",
  "description": "PT Nhà & Đô thị HUD6",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HUB",
  "description": "Xây lắp Huế",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HUG",
  "description": "May Hưng Yên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HUT",
  "description": "Xây dựng TASCO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HUX",
  "description": "Khoáng sản Thừa Thiên Huế",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HVA",
  "description": "Đầu tư HVA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HVG",
  "description": "Thủy sản Hùng Vương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HVH",
  "description": "Đầu tư & Công nghệ HVC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HVN",
  "description": "Vietnam Airlines",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HVT",
  "description": "Hóa chất Việt Trì",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "HVX",
  "description": "Xi măng Vicem Hải Vân",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "HWI",
  "description": "ĐTXD hạ tầng nước sạch HN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HWS",
  "description": "Cấp nước Thừa Thiên Huế",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IBC",
  "description": "Đầu tư APAX Holdings",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "IBD",
  "description": "In Tổng hợp Bình Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IBN",
  "description": "In báo Nghệ An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ICC",
  "description": "Xây dựng công nghiệp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ICF",
  "description": "Đầu tư Thương mại Thủy sản",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ICG",
  "description": "Xây dựng Sông Hồng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ICI",
  "description": "Đầu tư Xây dựng Công nghiệp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ICN",
  "description": "Xây dựng Dầu Khí IDICO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ICS",
  "description": "INCOSAF",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ICT",
  "description": "Viễn thông - Tin học Bưu điện",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "IDC",
  "description": "IDICO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "IDI",
  "description": "ĐT & PT Đa Quốc Gia",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "IDJ",
  "description": "IDJ Financial",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "IDP",
  "description": "Sữa Quốc tế",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IDV",
  "description": "PT Hạ tầng Vĩnh Phúc",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "IED",
  "description": "Xuất nhập khẩu Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IFS",
  "description": "Thực phẩm Quốc tế",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IHK",
  "description": "In Hàng Không",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IJC",
  "description": "Becamex IJC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ILA",
  "description": "ILA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ILB",
  "description": "ICD Tân Cảng Long Bình",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ILC",
  "description": "Hợp tác Lao động với NN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ILS",
  "description": "Thương mại & Dịch vụ Quốc tế",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IME",
  "description": "Xây lắp Công nghiệp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IMI",
  "description": "Máy & Dụng cụ Công nghiệp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IMP",
  "description": "Dược IMEXPHARM",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "IN4",
  "description": "In số 4",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "INC",
  "description": "Tư vấn Đầu tư IDICO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "INN",
  "description": "Bao bì & In Nông Nghiệp",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "IPA",
  "description": "Tập đoàn Đầu tư I.P.A",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "IPH",
  "description": "In & PH Biểu mẫu Thống kê",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IRC",
  "description": "Cao su Công nghiệp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ISG",
  "description": "INLACO SAIGON",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ISH",
  "description": "Thủy điện Srok Phu Miêng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IST",
  "description": "ICD Tân Cảng Sóng Thần",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ITA",
  "description": "Đầu tư Công nghiệp Tân Tạo",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ITC",
  "description": "Đầu tư - Kinh doanh nhà",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ITD",
  "description": "Công nghệ Tiên Phong",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ITQ",
  "description": "Tập đoàn Thiên Quang",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ITS",
  "description": "Thương mại & DV Vinacomin",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "IVS",
  "description": "Chứng khoán Đầu tư Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "JOS",
  "description": "Thủy sản Xuất khẩu Minh Hải",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "JVC",
  "description": "Thiết bị Y tế Việt Nhật",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "KAC",
  "description": "Địa ốc Khang An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KBC",
  "description": "TCT Đô thị Kinh Bắc",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "KCB",
  "description": "K.Sản Luyện Kim Cao Bằng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KCE",
  "description": "Bê tông Ly tâm ĐL Khánh Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KDC",
  "description": "Tập đoàn KIDO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "KDH",
  "description": "Nhà Khang Điền",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "KDM",
  "description": "Đầu tư HP Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KGM",
  "description": "Xuất nhập khẩu Kiên Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KHA",
  "description": "Đầu tư & Dịch vụ Khánh Hội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KHB",
  "description": "Khoáng sản Hòa Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KHD",
  "description": "Khoáng sản Hải Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KHG",
  "description": "BĐS Khải Hoàn Land",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "KHL",
  "description": "Vật liệu xây dựng Hưng Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KHP",
  "description": "Điện lực Khánh Hòa",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "KHS",
  "description": "Thủy sản Kiên Hùng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KHW",
  "description": "Cấp thoát nước Khánh Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KIP",
  "description": "K.I.P Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KKC",
  "description": "Kim khí KKC",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KLB",
  "description": "Ngân hàng Kiên Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KLF",
  "description": "KLF Global",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KLM",
  "description": "Kim loại màu Nghệ Tĩnh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KMR",
  "description": "MIRAE",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "KMT",
  "description": "Kim khí Miền Trung",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KNA",
  "description": "Khoáng sản Nghệ An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KOS",
  "description": "Công ty KOSY",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "KPF",
  "description": "Đầu tư Tài chính Hoàng Minh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "KSA",
  "description": "CN Khoáng sản Bình Thuận",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KSB",
  "description": "Khoáng sản Bình Dương",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "KSD",
  "description": "Đầu tư DNA",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KSF",
  "description": "Tập đoàn KSFinance",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KSH",
  "description": "Damac GLS",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KSK",
  "description": "Khoáng sản luyện kim màu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KSQ",
  "description": "CNC Capital Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KSS",
  "description": "Na Rì Hamico",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KST",
  "description": "KASATI",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KSV",
  "description": "Khoáng sản TKV",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KTC",
  "description": "Thương mại Kiên Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KTL",
  "description": "Kim khí Thăng Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KTS",
  "description": "Đường Kon Tum",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KTT",
  "description": "Xây lắp Điện Thiên Trường",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KTU",
  "description": "Môi trường Đô thị Kon Tum",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KTW",
  "description": "Cấp nước Kon Tum",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "KVC",
  "description": "Xuất nhập khẩu Inox Kim Vĩ",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "KWA",
  "description": "Cấp thoát nước Kiến Tường",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "L10",
  "description": "LILAMA 10",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "L12",
  "description": "LICOGI 12",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "L14",
  "description": "Licogi 14",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "L18",
  "description": "Licogi 18",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "L35",
  "description": "Cơ khí Lilama",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "L40",
  "description": "Đầu tư & Xây dựng 40",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "L43",
  "description": "LILAMA 45.3",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "L44",
  "description": "LILAMA 45.4",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "L45",
  "description": "LILAMA 45.1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "L61",
  "description": "LILAMA 69.1",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "L62",
  "description": "LILAMA 69.2",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "L63",
  "description": "LILAMA 69.3",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LAF",
  "description": "Chế biến Hàng XK Long An",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LAI",
  "description": "Xây dựng Long An IDICO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LAS",
  "description": "Hóa chất Lâm Thao",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "LAW",
  "description": "Cấp thoát nước Long An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LBC",
  "description": "Thương mại Đầu tư Long Biên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LBE",
  "description": "Sách & Thiết bị TH Long An",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "LBM",
  "description": "Khoáng sản Lâm Đồng",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LCC",
  "description": "Xi măng Hồng Phong",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LCD",
  "description": "Thí nghiệm cơ điện",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "LCG",
  "description": "LICOGI 16",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LCM",
  "description": "Khoáng sản Lào Cai",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LCS",
  "description": "Licogi 16.6",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "LCW",
  "description": "Nước sạch Lai Châu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LDG",
  "description": "Đầu tư LDG",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LDP",
  "description": "Dược Lâm Đồng - Ladophar",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "LDW",
  "description": "Cấp thoát nước Lâm Đồng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LEC",
  "description": "BĐS Điện lực Miền Trung",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LG9",
  "description": "Cơ giới & Xây lắp số 9",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LGC",
  "description": "Đầu tư Cầu đường CII",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LGL",
  "description": "Long Giang Land",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LGM",
  "description": "Giày da & May mặc Legamex",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LHC",
  "description": "Xây dựng Thủy lợi Lâm Đồng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "LHG",
  "description": "KCN Long Hậu",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LIC",
  "description": "LICOGI",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LIG",
  "description": "Licogi 13",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "LIX",
  "description": "Bột giặt LIX",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LKW",
  "description": "Cấp nước Long Khánh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LLM",
  "description": "LILAMA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LM3",
  "description": "Lilama 3",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LM7",
  "description": "LILAMA 7",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "LM8",
  "description": "LILAMA 18",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LMC",
  "description": "Khoáng sản LATCA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LMH",
  "description": "Landmark Holding",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LMI",
  "description": "Lắp máy IDICO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LNC",
  "description": "Lệ Ninh - Quảng Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LO5",
  "description": "LILAMA 5",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LPB",
  "description": "LienVietPostBank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LPT",
  "description": "TM & SX Lập Phương Thành",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LQN",
  "description": "Licogi Quảng Ngãi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LSS",
  "description": "Mía đường Lam Sơn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "LTC",
  "description": "Điện nhẹ Viễn thông",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LTG",
  "description": "Tập đoàn Lộc Trời",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LUT",
  "description": "ĐT & XD Lương Tài",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "LWS",
  "description": "Cấp nước Lào Cai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "LYF",
  "description": "Lương Thực Lương Yên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "M10",
  "description": "TCT May 10",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MA1",
  "description": "MACHINCO1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MAC",
  "description": "MASERCO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MAS",
  "description": "Sân bay Đà Nẵng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MBB",
  "description": "MBBank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "MBG",
  "description": "Tập đoàn MBG",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MBN",
  "description": "Môi trường & CT ĐT Bắc Ninh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MBS",
  "description": "Chứng khoán MB",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MC3",
  "description": "Khoáng sản 3 - Vimico",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MCC",
  "description": "Gạch ngói cao cấp",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MCD",
  "description": "Môi trường và Đô thị Đông Hà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MCF",
  "description": "MECOFOOD",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MCG",
  "description": "Cơ điện & Xây dựng VN",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "MCH",
  "description": "Hàng tiêu dùng Masan",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MCI",
  "description": "Phát triển VLXD IDICO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MCM",
  "description": "Giống bò sữa Mộc Châu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MCO",
  "description": "BDC Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MCP",
  "description": "In & Bao bì Mỹ Châu",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "MDA",
  "description": "Môi trường Đô thị Đông Anh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MDC",
  "description": "Than Mông Dương",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MDF",
  "description": "Gỗ MDF VRG - Quảng Trị",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MDG",
  "description": "Xây dựng Miền Đông",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "MEC",
  "description": "Lắp máy Sông Đà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MED",
  "description": "Dược Mediplantex",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MEF",
  "description": "MEINFA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MEG",
  "description": "Công ty Megram",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MEL",
  "description": "Thép Mê Lin",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MES",
  "description": "Cơ điện Công trình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MEY",
  "description": "Tập đoàn Meey Land",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MFS",
  "description": "Mobifone Service",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MGC",
  "description": "Địa chất mỏ - TKV",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MGG",
  "description": "May Đức Giang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MH3",
  "description": "KCN Cao su Bình Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MHC",
  "description": "Hàng hải Hà Nội",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "MHL",
  "description": "Minh Hữu Liên",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MIC",
  "description": "Khoáng sản Quảng Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MIE",
  "description": "Máy & Thiết bị Công nghiệp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MIG",
  "description": "Bảo hiểm Quân đội",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "MIM",
  "description": "Khoáng sản & Cơ khí",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MKP",
  "description": "Dược Mekophar",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MKV",
  "description": "Dược Thú Y Cai Lậy",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MLC",
  "description": "Môi trường Đô thị Lào Cai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MLS",
  "description": "Chăn nuôi Mitraco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MML",
  "description": "Masan MEATLife",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MNB",
  "description": "May Nhà Bè",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MND",
  "description": "Môi trường Nam Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MPC",
  "description": "Thủy sản Minh Phú",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MPT",
  "description": "Tập đoàn Trường Tiền",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MPY",
  "description": "Môi trường đô thị Phú Yên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MQB",
  "description": "Môi trường PTĐT Quảng Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MQN",
  "description": "Môi trường đô thị Quảng Ngãi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MRF",
  "description": "Cao su y tế Merufa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MSB",
  "description": "MSB Bank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "MSH",
  "description": "May Sông Hồng",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "MSN",
  "description": "Tập đoàn Masan",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "MSR",
  "description": "Tài Nguyên Masan",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MST",
  "description": "Đầu tư MST",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MT9",
  "description": "319 Miền Trung",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MTA",
  "description": "Mitraco Hà Tĩnh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MTB",
  "description": "Công trình Đô thị Thái Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MTC",
  "description": "Dịch vụ Du lịch Mỹ Trà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MTG",
  "description": "MTGAS",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MTH",
  "description": "Môi trường Đô thị Hà Đông",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MTL",
  "description": "Môi trường Đô thị Từ Liêm",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MTP",
  "description": "Dược Medipharco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MTS",
  "description": "Vật tư - TKV",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MTV",
  "description": "Công trình đô thị Vũng Tàu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MVB",
  "description": "Mỏ Việt Bắc - TKV",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MVC",
  "description": "Vật liệu & XD Bình Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MVN",
  "description": "VINALINES",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MVT",
  "description": "May Việt Thịnh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MWG",
  "description": "Thế giới Di động",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "MXC",
  "description": "TT Nông nghiệp Mùa Xuân",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NAB",
  "description": "Ngân hàng Nam Á",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NAC",
  "description": "Tư vấn Xây dựng Tổng hợp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NAF",
  "description": "Nafoods Group",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NAG",
  "description": "Tập đoàn Nagakawa",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NAP",
  "description": "Cảng Nghệ Tĩnh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NAS",
  "description": "DV Hàng không SB Nội Bài",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NAU",
  "description": "Công trình Đô thị Nghệ An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NAV",
  "description": "Tấm lợp & Gỗ Nam Việt",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NAW",
  "description": "Cấp nước Nghệ An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NBB",
  "description": "577 CORP",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NBC",
  "description": "Than Núi Béo",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NBE",
  "description": "Sách & Thiết bị GD Miền Bắc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NBP",
  "description": "Nhiệt điện Ninh Bình",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NBT",
  "description": "Cấp thoát nước Bến Tre",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NBW",
  "description": "Cấp nước Nhà Bè",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NCS",
  "description": "Suất ăn Hàng không Nội Bài",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NCT",
  "description": "DV Hàng hóa Nội Bài",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ND2",
  "description": "ĐT & PT Điện Miền Bắc 2",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NDC",
  "description": "Nam Dược",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NDF",
  "description": "Nông sản Xuất khẩu Nam Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NDN",
  "description": "Nhà Đà Nẵng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NDP",
  "description": "Dược phẩm 2/9",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NDT",
  "description": "Dệt may Nam Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NDW",
  "description": "Cấp nước Nam Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NDX",
  "description": "Xây lắp PT Nhà Đà Nẵng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NED",
  "description": "Phát triển Điện Tây Bắc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NET",
  "description": "Bột giặt Net",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NFC",
  "description": "Phân lân Ninh Bình",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NGC",
  "description": "Thủy sản Ngô Quyền",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NHA",
  "description": "PT Nhà & Đô thị Nam Hà Nội",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NHC",
  "description": "Gạch ngói Nhị Hiệp",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NHH",
  "description": "Nhựa Hà Nội",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NHP",
  "description": "Sản xuất Xuất nhập khẩu NHP",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NHT",
  "description": "SX & T.Mại Nam Hoa",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NHV",
  "description": "Đầu tư NHV",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NJC",
  "description": "May Nam Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NKG",
  "description": "Thép Nam Kim",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NLG",
  "description": "Bất động sản Nam Long",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NLS",
  "description": "Cấp thoát nước Lạng Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NNC",
  "description": "Đá Núi Nhỏ",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NNG",
  "description": "CN - DV - TM Ngọc Nghĩa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NNQ",
  "description": "Giống Nông Lâm Quảng Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NNT",
  "description": "Cấp nước Ninh Thuận",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NOS",
  "description": "Vận tải Biển TM Phương Đông",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NQB",
  "description": "Cấp nước Quảng Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NQN",
  "description": "Nước sạch Quảng Ninh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NQT",
  "description": "Nước sạch Quảng Trị",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NRC",
  "description": "Bất động sản Netland",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NS2",
  "description": "Nước sạch số 2 Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NS3",
  "description": "Nước sạch số 3 Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NSC",
  "description": "Giống cây trồng Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NSG",
  "description": "Nhựa Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NSH",
  "description": "Nhôm Sông Hồng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NSL",
  "description": "Cấp nước Sơn La",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NSS",
  "description": "Nông súc sản Đồng Nai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NST",
  "description": "Thuốc lá Ngân Sơn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NT2",
  "description": "Điện lực Nhơn Trạch 2",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NTB",
  "description": "Công trình giao thông 584",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NTC",
  "description": "KCN Nam Tân Uyên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NTF",
  "description": "Dược Nghệ An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NTH",
  "description": "Thủy điện Nước Trong",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NTL",
  "description": "Đô thị Từ Liêm",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NTP",
  "description": "Nhựa Tiền Phong",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NTT",
  "description": "Dệt - May Nha Trang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NTW",
  "description": "Cấp nước Nhơn Trạch",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NUE",
  "description": "Môi trường Đô thị Nha Trang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NVB",
  "description": "Ngân hàng Quốc Dân",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "NVL",
  "description": "Novaland",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NVP",
  "description": "Nước sạch Vĩnh Phúc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NVT",
  "description": "Ninh Vân Bay",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NWT",
  "description": "Vận tải Newway",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NXT",
  "description": "SX Cung ứng VLXD Kon Tum",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "OCB",
  "description": "Ngân hàng Phương Đông",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "OCH",
  "description": "Khách sạn & Dịch vụ OCH",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ODE",
  "description": "Truyền thông và Giải trí ODE",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "OGC",
  "description": "Tập đoàn Đại Dương",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "OIL",
  "description": "PV Oil",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ONE",
  "description": "Truyền thông số 1",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ONW",
  "description": "Dịch vụ Một Thế giới",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "OPC",
  "description": "Dược phẩm OPC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ORS",
  "description": "Chứng khoán Tiên Phong",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PAC",
  "description": "Pin Ắc quy Miền Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PAI",
  "description": "Tự động hóa Dầu khí - PAIC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PAN",
  "description": "Tập đoàn PAN",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PAP",
  "description": "Cảng Phước An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PAS",
  "description": "Quốc tế Phương Anh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PBC",
  "description": "Dược Pharbaco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PBK",
  "description": "Điện lực Dầu khí Bắc Kạn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PBP",
  "description": "Bao bì Dầu khí VN",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PBT",
  "description": "PV Building",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PC1",
  "description": "Xây lắp điện I",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PCC",
  "description": "Xây lắp 1 - Petrolimex",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PCE",
  "description": "Phân bón HC DK Miền Trung",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PCF",
  "description": "Cà phê PETEC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PCG",
  "description": "Đầu tư PT Gas Đô thị",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PCM",
  "description": "Vật liệu xây dựng Bưu điện",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PCN",
  "description": "Dầu khí DMC - Miền Bắc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PCT",
  "description": "Vận tải Khí & Hóa chất VN",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PDB",
  "description": "DUFAGO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PDC",
  "description": "Dầu khí Phương Đông",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PDN",
  "description": "Cảng Đồng Nai",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PDR",
  "description": "Bất động sản Phát Đạt",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PDT",
  "description": "T.Mại Dầu khí Đồng Tháp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PDV",
  "description": "Vận tải Dầu Phương Đông Việt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PEC",
  "description": "Cơ khí Điện lực",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PEG",
  "description": "TM Kỹ thuật & Đầu tư PETEC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PEN",
  "description": "Xây lắp III Petrolimex",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PEQ",
  "description": "Thiết bị Xăng dầu Petrolimex",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PET",
  "description": "PETROLSETCO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PFL",
  "description": "Dầu khí Đông Đô",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PGB",
  "description": "PG Bank",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PGC",
  "description": "Gas Petrolimex",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PGD",
  "description": "PV GAS D",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PGI",
  "description": "Bảo hiểm PJICO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PGN",
  "description": "Phụ Gia Nhựa",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PGS",
  "description": "Khí Miền Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PGT",
  "description": "PGT Holdings",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PGV",
  "description": "Tổng Công ty Phát điện 3",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PHC",
  "description": "Phục Hưng Holdings",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PHH",
  "description": "Hồng Hà Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PHN",
  "description": "Pin Hà Nội",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PHP",
  "description": "Cảng Hải Phòng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PHR",
  "description": "Cao su Phước Hòa",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PHS",
  "description": "Chứng khoán Phú Hưng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PIA",
  "description": "Tin học Viễn thông Petrolimex",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PIC",
  "description": "Đầu tư Điện lực 3",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PID",
  "description": "Trang trí Nội thất Dầu khí",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PIS",
  "description": "Pisico Bình Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PIT",
  "description": "XNK PETROLIMEX",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PIV",
  "description": "PIV JSC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PJC",
  "description": "T.Mại & Vận tải Petrolimex HN",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PJS",
  "description": "Cấp nước Phú Hòa Tân",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PJT",
  "description": "Vận tải thủy PETROLIMEX",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PLA",
  "description": "ĐT & DV Hạ tầng Xăng dầu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PLC",
  "description": "Hóa dầu Petrolimex",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PLE",
  "description": "Tư vấn Xây dựng Petrolimex",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PLO",
  "description": "Kho vận Petec",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PLP",
  "description": "Nhựa Pha Lê",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PLX",
  "description": "Petrolimex",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PMB",
  "description": "Phân bón HC DK Miền Bắc",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PMC",
  "description": "Dược Pharmedic",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PMG",
  "description": "Petro Miền Trung",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PMJ",
  "description": "Vật tư Bưu điện",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PMP",
  "description": "Bao bì Đạm Phú Mỹ",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PMS",
  "description": "Cơ khí xăng dầu",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PMT",
  "description": "Telvina Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PMW",
  "description": "Cấp Nước Phú Mỹ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PNC",
  "description": "Văn hóa Phương nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PND",
  "description": "Xăng dầu Dầu khí Nam Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PNG",
  "description": "Thương Mại Phú Nhuận",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PNJ",
  "description": "Vàng Bạc Đá quý Phú Nhuận",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PNP",
  "description": "Tân Cảng - Phú Hữu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PNT",
  "description": "Kỹ thuật Xây dựng Phú Nhuận",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "POB",
  "description": "PVOIL Thái Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "POM",
  "description": "Thép Pomina",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "POS",
  "description": "Bảo dưỡng công trình DK biển",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "POT",
  "description": "Thiết bị Bưu điện Postef",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "POV",
  "description": "PV OIL Vũng Áng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "POW",
  "description": "Điện lực Dầu khí Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PPC",
  "description": "Nhiệt điện Phả Lại",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PPE",
  "description": "PVPower Engineering",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PPH",
  "description": "Phong Phú Corp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PPI",
  "description": "BĐS Thái Bình Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PPP",
  "description": "PP.Pharco",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PPS",
  "description": "DV KT Điện lực Dầu khí",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PPV",
  "description": "Phốt Pho Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PPY",
  "description": "Xăng dầu dầu khí Phú Yên",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PQN",
  "description": "DV Dầu khí Quảng Ngãi PTSC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PRC",
  "description": "Vận tải Portserco",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PRE",
  "description": "Tái bảo hiểm PVI",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PRO",
  "description": "Procimex Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PRT",
  "description": "Sản xuất - XNK Bình Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PSB",
  "description": "Sao Mai Bến Đình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PSC",
  "description": "Vận tải Petrolimex Sài Gòn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PSD",
  "description": "Phân phối Tổng hợp Dầu khí",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PSE",
  "description": "Phân bón HCDK Đông Nam Bộ",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PSG",
  "description": "Xây lắp Dầu khí Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PSH",
  "description": "TMĐT Dầu khí Nam Sông Hậu",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PSI",
  "description": "Chứng khoán Dầu khí",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PSL",
  "description": "Chăn nuôi Phú Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PSN",
  "description": "PTSC Thanh Hóa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PSP",
  "description": "DV Dầu khí Đình Vũ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PSW",
  "description": "Phân bón HC DK Tây Nam Bộ",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PTB",
  "description": "Phú Tài",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PTC",
  "description": "Xây lắp Bưu Điện PTIC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PTD",
  "description": "Thiết kế XD TM Phúc Thịnh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PTE",
  "description": "Xi măng Phú Thọ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PTG",
  "description": "May Phan Thiết",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PTH",
  "description": "Vận tải DV Petrolimex Hà Tây",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PTI",
  "description": "Bảo hiểm Bưu điện",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PTL",
  "description": "Petroland",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PTN",
  "description": "Phát triển Nhà Khánh Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PTO",
  "description": "Xây dựng Công trình Bưu điện",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PTP",
  "description": "Viễn Thông & In Bưu điện",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PTS",
  "description": "Vận tải Petrolimex Hải Phòng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PTT",
  "description": "Vận tải Dầu khí Đông Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PTV",
  "description": "Thương mại dầu khí",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PTX",
  "description": "Vận tải Petrolimex Nghệ Tĩnh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PV2",
  "description": "Đầu tư PV2",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PVA",
  "description": "Xây lắp Dầu khí Nghệ An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PVB",
  "description": "Bọc ống Dầu khí Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PVC",
  "description": "Dung dịch Khoan Dầu khí",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PVD",
  "description": "Khoan Dầu khí PVDrilling",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PVE",
  "description": "Tư vấn Dầu khí",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PVG",
  "description": "Kinh doanh LPG Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PVH",
  "description": "Xây lắp Dầu khí Thanh Hóa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PVI",
  "description": "Bảo hiểm PVI",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PVL",
  "description": "Đầu tư Nhà Đất Việt",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PVM",
  "description": "PV MACHINO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PVO",
  "description": "Dầu nhờn PV Oil",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PVP",
  "description": "Vận tải DK Thái Bình Dương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PVR",
  "description": "Đầu tư PVR Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PVS",
  "description": "DVKT Dầu khí PTSC",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PVT",
  "description": "Vận tải Dầu khí PVTrans",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PVV",
  "description": "Vinaconex 39",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PVX",
  "description": "Xây lắp dầu khí Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PVY",
  "description": "Chế tạo Giàn khoan Dầu khí",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PWA",
  "description": "Bất động sản dầu khí",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PWS",
  "description": "Cấp thoát nước Phú Yên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PX1",
  "description": "Xi măng Sông Lam 2",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PXA",
  "description": "ĐT & TM Dầu khí Nghệ An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PXC",
  "description": "Phát triển Đô thị Dầu khí",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PXI",
  "description": "XD CN & Dân dụng Dầu khí",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PXK",
  "description": "Xây lắp dầu khí Kinh Bắc",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PXL",
  "description": "KCN Dầu khí Long Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PXM",
  "description": "Xây lắp Dầu khí Miền Trung",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PXS",
  "description": "Lắp máy Dầu khí",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "PXT",
  "description": "Xây lắp Đường ống Dầu khí",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "PYU",
  "description": "Môi trường & CT ĐT Phúc Yên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QBS",
  "description": "Xuất nhập khẩu Quảng Bình",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "QCC",
  "description": "XD & PT Hạ tầng Viễn thông",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QCG",
  "description": "Quốc Cường Gia Lai",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "QHD",
  "description": "Que hàn Việt Đức",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "QHW",
  "description": "Nước khoáng Quảng Ninh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QLD",
  "description": "QL & XD Giao thông Lạng Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QLT",
  "description": "WAMICO 10",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QNC",
  "description": "Xi măng Quảng Ninh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QNS",
  "description": "Đường Quảng Ngãi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QNT",
  "description": "Tư vấn XD Thị xã Điện Bàn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QNU",
  "description": "Môi trường Đô thị Quảng Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QNW",
  "description": "Cấp thoát nước Quảng Ngãi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QPH",
  "description": "Thủy điện Quế Phong",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QSP",
  "description": "Tân cảng Quy Nhơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "QST",
  "description": "Sách Quảng Ninh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "QTC",
  "description": "Công trình GTVT Quảng Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "QTP",
  "description": "Nhiệt điện Quảng Ninh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "RAL",
  "description": "Rạng Đông",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "RAT",
  "description": "Vận tải & T.Mại Đường sắt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "RBC",
  "description": "Công nghiệp & XNK Cao Su",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "RCC",
  "description": "Công trình Đường sắt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "RCD",
  "description": "Xây dựng - Địa ốc Cao su",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "RCL",
  "description": "Địa ốc Chợ Lớn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "RDP",
  "description": "Nhựa Rạng Đông",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "REC",
  "description": "Cơ khí Cao su",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "REE",
  "description": "Cơ điện lạnh REE",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "REN",
  "description": "XD & ĐT Khu du lịch Sinh Thái",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "RGC",
  "description": "Đầu tư PV-Inconess",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "RIC",
  "description": "Quốc tế Hoàng Gia",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ROS",
  "description": "Xây dựng FLC FAROS",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "RRC",
  "description": "Than Sông Hồng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "RTB",
  "description": "Cao su Tân Biên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "S12",
  "description": "Sông Đà 12",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "S27",
  "description": "Sông Đà 27",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "S4A",
  "description": "Thủy điện Sê San 4A",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "S55",
  "description": "Sông Đà 505",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "S72",
  "description": "Sông Đà 7.02",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "S74",
  "description": "Sông Đà 7.04",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "S96",
  "description": "Sông Đà 9.06",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "S99",
  "description": "Sông Đà 9.09 (SCI)",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SAB",
  "description": "SABECO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SAC",
  "description": "Dịch vụ cảng Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SAD",
  "description": "Sản xuất Thương mại Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SAF",
  "description": "Thực Phẩm SAFOCO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SAL",
  "description": "Trục vớt Cứu hộ Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SAM",
  "description": "SAM Holdings",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SAP",
  "description": "In Sách TP.HCM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SAS",
  "description": "DV Hàng không SB TSN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SAV",
  "description": "Savimex",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SB1",
  "description": "Bia Sài Gòn - Nghệ Tĩnh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SBA",
  "description": "Thủy điện Sông Ba",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SBD",
  "description": "Công nghệ Sao Bắc Đẩu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SBH",
  "description": "Thủy điện Sông Ba Hạ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SBL",
  "description": "Bia Sài Gòn - Bạc Liêu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SBM",
  "description": "Đầu tư Phát triển Bắc Minh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SBR",
  "description": "Cao su Sông Bé",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SBS",
  "description": "Chứng khoán Sacombank",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SBT",
  "description": "Mía đường Thành Thành Công - Biên Hòa",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SBV",
  "description": "Siam Brothers Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SC5",
  "description": "Xây dựng số 5",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SCA",
  "description": "Nông nghiệp Sông Con",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SCC",
  "description": "Xi măng Sông Đà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SCD",
  "description": "Giải khát Chương Dương",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SCG",
  "description": "Xây dựng SCG",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SCI",
  "description": "SCI E&C",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SCJ",
  "description": "Xi măng Sài Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SCL",
  "description": "Sông Đà Cao Cường",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SCO",
  "description": "Công nghiệp Thủy Sản",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SCR",
  "description": "Sacomreal",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SCS",
  "description": "DV Hàng hóa Sài Gòn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SCV",
  "description": "Muối Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SCY",
  "description": "Đóng tàu Sông Cấm",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SD1",
  "description": "Sông Đà 1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SD2",
  "description": "Sông Đà 2",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SD3",
  "description": "Sông Đà 3",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SD4",
  "description": "Sông Đà 4",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SD5",
  "description": "Sông Đà 5",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SD6",
  "description": "Sông Đà 6",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SD7",
  "description": "Sông Đà 7",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SD8",
  "description": "Sông Đà 8",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SD9",
  "description": "Sông Đà 9",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SDA",
  "description": "Simco Sông Đà",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SDB",
  "description": "Sông Đà 207",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SDC",
  "description": "Tư vấn Sông Đà",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SDD",
  "description": "Xây lắp Sông Đà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SDG",
  "description": "Sadico Cần Thơ",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SDH",
  "description": "Hạ tầng Sông Đà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SDJ",
  "description": "Sông Đà 25",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SDK",
  "description": "Cơ khí Luyện Kim",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SDN",
  "description": "Sơn Đồng Nai",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SDP",
  "description": "ĐT & TM DK Sông Đà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SDT",
  "description": "Sông Đà 10",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SDU",
  "description": "Phát triển Đô thị Sông Đà",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SDV",
  "description": "Dịch vụ Sonadezi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SDX",
  "description": "PCCC & Đầu tư XD Sông Đà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SDY",
  "description": "Xi măng Sông Đà Yaly",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SEA",
  "description": "SEAPRODEX",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SEB",
  "description": "Điện miền Trung",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SED",
  "description": "PT Giáo dục Phương Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SEP",
  "description": "Thương mại Quảng Trị",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SFC",
  "description": "Nhiên liệu Sài Gòn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SFG",
  "description": "Phân bón Miền Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SFI",
  "description": "Vận tải SAFI",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SFN",
  "description": "Dệt lưới Sài Gòn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SGB",
  "description": "Sài Gòn Công thương",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SGC",
  "description": "Bánh phồng tôm Sa Giang",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SGD",
  "description": "Sách Giáo dục TP.HCM",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SGH",
  "description": "Khách sạn Sài Gòn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SGI",
  "description": "ĐT & PT Sài Gòn 3 Group",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SGN",
  "description": "Phục vụ Mặt đất Sài Gòn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SGO",
  "description": "Dầu thực vật Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SGP",
  "description": "Cảng Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SGR",
  "description": "Địa ốc Sài Gòn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SGS",
  "description": "Vận tải biển Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SGT",
  "description": "Sài Gòn Telecom",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SGV",
  "description": "Vinaconex Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SHA",
  "description": "Sơn Hà Sài Gòn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SHB",
  "description": "Ngân hàng Sài Gòn Hà Nội",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SHC",
  "description": "Hàng hải Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SHE",
  "description": "PT Năng Lượng Sơn Hà",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SHG",
  "description": "Xây dựng Sông Hồng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SHI",
  "description": "Sơn Hà",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SHN",
  "description": "Đầu tư Tổng hợp Hà Nội",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SHP",
  "description": "Thủy điện Miền Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SHS",
  "description": "Chứng khoán Sài Gòn Hà Nội",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SHX",
  "description": "Sài Gòn Hỏa xa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SIC",
  "description": "ANI",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SID",
  "description": "Đầu tư & PT Sài Gòn Co.op",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SIG",
  "description": "Đầu tư & T.Mại Sông Đà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SII",
  "description": "Hạ tầng Nước Sài Gòn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SIP",
  "description": "Đầu tư Sài Gòn VRG",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SIV",
  "description": "Sơn Sivico",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SJ1",
  "description": "Nông nghiệp Hùng Hậu",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SJC",
  "description": "Sông Đà 1.01",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SJD",
  "description": "Thủy điện Cần Đơn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SJE",
  "description": "Sông Đà 11",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SJF",
  "description": "Đầu tư Sao Thái Dương",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SJG",
  "description": "Tổng Công ty Sông Đà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SJM",
  "description": "Sông Đà 19",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SJS",
  "description": "SUDICO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SKG",
  "description": "Tàu Cao tốc Superdong",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SKH",
  "description": "Nước GK Sanest Khánh Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SKN",
  "description": "Nước GK Sanna Khánh Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SKV",
  "description": "Nước GK Yến sào Khánh Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SLS",
  "description": "Mía đường Sơn La",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SMA",
  "description": "Thiết bị Phụ tùng Sài Gòn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SMB",
  "description": "Bia Sài Gòn - Miền Trung",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SMC",
  "description": "Đầu tư & Thương mại SMC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SMN",
  "description": "Sách & Thiết bị GD miền Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SMT",
  "description": "SAMETEL",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SNC",
  "description": "Thủy sản Năm Căn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SNZ",
  "description": "SONADEZI",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SON",
  "description": "Cung ứng Nhân lực QT & TM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SP2",
  "description": "Thủy điện Sử Pán 2",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SPA",
  "description": "Bao bì Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SPB",
  "description": "Sợi Phú Bài",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SPC",
  "description": "Bảo vệ Thực vật Sài Gòn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SPD",
  "description": "Thủy sản Miền Trung",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SPH",
  "description": "Xuất nhập khẩu Thủy sản HN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SPI",
  "description": "Đá Spilít",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SPM",
  "description": "S.P.M CORP",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SPP",
  "description": "Bao bì Nhựa Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SPS",
  "description": "Dịch vụ Dầu khí Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SPV",
  "description": "Thủy đặc sản",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SQC",
  "description": "Khoáng sản SG - Quy Nhơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SRA",
  "description": "SARA Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SRB",
  "description": "SARA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SRC",
  "description": "Cao su Sao Vàng",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SRF",
  "description": "SEAREFICO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SRT",
  "description": "Vận tải Đường sắt Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SSB",
  "description": "SeABank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SSC",
  "description": "Giống cây trồng Miền Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SSF",
  "description": "Giầy Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SSG",
  "description": "Vận tải Biển Hải Âu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SSH",
  "description": "Phát triển Sunshine Homes",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SSI",
  "description": "Chứng khoán SSI",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SSM",
  "description": "Kết cấu Thép VNECO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SSN",
  "description": "Thủy sản Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SST",
  "description": "Sabeco Sông Tiền",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SSU",
  "description": "Môi trường Đô thị Sóc Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ST8",
  "description": "Thiết bị Siêu Thanh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "STB",
  "description": "Sacombank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "STC",
  "description": "Sách & Thiết bị TP. HCM",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "STD",
  "description": "Bia - NGK Sài Gòn - Tây Đô",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "STG",
  "description": "Kho Vận Miền Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "STH",
  "description": "Phát hành sách Thái Nguyên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "STK",
  "description": "Sợi Thế Kỷ",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "STL",
  "description": "Sông Đà - Thăng Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "STP",
  "description": "CN Thương Mại Sông Đà",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "STS",
  "description": "Dịch vụ vận tải Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "STT",
  "description": "Vận chuyển Sài Gòn Tourist",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "STW",
  "description": "Cấp nước Sóc Trăng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SVC",
  "description": "SAVICO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SVD",
  "description": "Đầu tư & Thương mại Vũ Đăng",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SVG",
  "description": "Hơi kỹ nghệ Que hàn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SVH",
  "description": "Thủy điện Sông Vàng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SVI",
  "description": "Bao bì Biên Hòa",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SVL",
  "description": "Nhân lực Quốc tế Sovilaco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SVN",
  "description": "Tập đoàn Vexilla Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SVT",
  "description": "Công nghệ Sài Gòn Viễn Đông",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SWC",
  "description": "Đường Sông Miền Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SZB",
  "description": "Sonadezi Long Bình",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "SZC",
  "description": "Sonadezi Châu Đức",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SZE",
  "description": "Môi trường Sonadezi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SZG",
  "description": "Sonadezi Giang Điền",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SZL",
  "description": "Sonadezi Long Thành",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "Sữa",
  "description": "Sữa",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "T12",
  "description": "Thương mại Dịch vụ Tràng Thi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TA3",
  "description": "ĐT & Xây lắp Thành An 386",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TA6",
  "description": "ĐT & Xây lắp Thành An 665",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TA9",
  "description": "Xây lắp Thành An 96",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TAC",
  "description": "Dầu Tường An",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TAG",
  "description": "Trần Anh description",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TAN",
  "description": "Cà phê Thuận An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TAP",
  "description": "Đô thị Tân An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TAR",
  "description": "Nông nghiệp CN cao Trung An",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TAW",
  "description": "Cấp nước Trung An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TB8",
  "description": "Vật tư Thiết bị - VVMI",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TBC",
  "description": "Thủy điện Thác Bà",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TBD",
  "description": "Thiết bị điện Đông Anh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TBH",
  "description": "Tổng Bách Hóa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TBR",
  "description": "Địa ốc Tân Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TBT",
  "description": "Công trình Giao thông Bến Tre",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TBX",
  "description": "Xi măng Thái Bình",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TC6",
  "description": "Than Cọc Sáu",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TCB",
  "description": "Techcombank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TCD",
  "description": "ĐT PT Công nghiệp & Vận tải",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TCH",
  "description": "ĐT DV Tài chính Hoàng Huy",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TCI",
  "description": "Chứng khoán Thành Công",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TCJ",
  "description": "Tô Châu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TCK",
  "description": "COMA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TCL",
  "description": "Tân Cảng Logistics",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TCM",
  "description": "Dệt may Thành Công",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TCO",
  "description": "Vận tải Duyên Hải",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TCP",
  "description": "Than Cẩm Phả - Vinacomin",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TCR",
  "description": "Gốm sứ TAICERA",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TCT",
  "description": "Cáp treo Tây Ninh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TCW",
  "description": "Kho vận Tân Cảng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TDB",
  "description": "Thủy điện Định Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TDC",
  "description": "Becamex TDC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TDF",
  "description": "Xây dựng Trung Đô",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TDG",
  "description": "Dầu khí Thái Dương",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TDH",
  "description": "Thủ Đức House",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TDI",
  "description": "ĐT XD & CGCN Thành Đoàn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TDM",
  "description": "Nước Thủ Dầu Một",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TDN",
  "description": "Than Đèo Nai",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TDP",
  "description": "Công ty Thuận Đức",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TDS",
  "description": "Thép Thủ Đức",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TDT",
  "description": "Đầu tư & Phát triển TDT",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TDW",
  "description": "Cấp nước Thủ Đức",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TEC",
  "description": "Traenco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TED",
  "description": "Thiết kế GTVT",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TEG",
  "description": "TECGROUP",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TEL",
  "description": "PT Công trình Viễn thông",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TET",
  "description": "May mặc Miền Bắc",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TFC",
  "description": "Trang Corp",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TGG",
  "description": "Đầu tư & XD Trường Giang",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TGP",
  "description": "Cáp Trường Phú",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TH1",
  "description": "Xuất nhập khẩu Tổng hợp I",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "THB",
  "description": "Bia Hà Nội - Thanh Hóa",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "THD",
  "description": "Thaiholdings",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "THG",
  "description": "ĐT & XD Tiền Giang",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "THI",
  "description": "Thiết bị điện",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "THN",
  "description": "Cấp nước Thanh Hóa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "THO",
  "description": "Xây Lắp Tây Hồ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "THP",
  "description": "Thủy sản & TM Thuận Phước",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "THS",
  "description": "Thanh Hoa Sông Đà",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "THT",
  "description": "Than Hà Tu",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "THU",
  "description": "Môi trường CTĐT Thanh Hóa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "THW",
  "description": "Cấp nước Tân Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TID",
  "description": "TCT Tín Nghĩa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TIE",
  "description": "Điện tử TIE",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TIG",
  "description": "Đầu tư Thăng Long",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TIN",
  "description": "Tài chính Cổ phần Tín Việt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TIP",
  "description": "Khu công nghiệp Tín Nghĩa",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TIS",
  "description": "Gang thép Thái Nguyên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TIX",
  "description": "TANIMEX",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TJC",
  "description": "TRANSCO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TKA",
  "description": "Tân Khánh An",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TKC",
  "description": "Địa ốc Tân Kỷ",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TKG",
  "description": "SX & T.Mại Tùng Khánh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TKU",
  "description": "Công nghiệp Tung Kuang",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TL4",
  "description": "Xây dựng Thủy lợi 4",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TLD",
  "description": "XD & PT Đô thị Thăng Long",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TLG",
  "description": "Tập đoàn Thiên Long",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TLH",
  "description": "Thép Tiến Lên",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TLI",
  "description": "May Quốc tế Thắng Lợi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TLP",
  "description": "Thương mại XNK Thanh Lễ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TLT",
  "description": "Viglacera Thăng long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TMB",
  "description": "Than Miền Bắc - Vinacomin",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TMC",
  "description": "Xuất nhập khẩu Thủ Đức",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TMG",
  "description": "Kim loại màu Thái Nguyên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TMP",
  "description": "Thủy điện Thác Mơ",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TMS",
  "description": "Transimex",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TMT",
  "description": "Ô tô TMT",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TMW",
  "description": "Gỗ Tân Mai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TMX",
  "description": "VICEM Thương mại Xi măng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TN1",
  "description": "TNS Holdings",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TNA",
  "description": "Xuất nhập khẩu Thiên Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TNB",
  "description": "Thép Nhà Bè",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TNC",
  "description": "Cao su Thống Nhất",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TNG",
  "description": "Đầu tư & Thương mại TNG",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TNH",
  "description": "Bệnh viện QT Thái Nguyên",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TNI",
  "description": "Tập đoàn Thành Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TNM",
  "description": "XNK & Xây dựng Công trình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TNP",
  "description": "Cảng Thị Nại",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TNS",
  "description": "Thép Tấm lá Thống Nhất",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TNT",
  "description": "TAI NGUYEN CORP",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TNW",
  "description": "Nước sạch Thái Nguyên",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TOP",
  "description": "Phân phối Top One",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TOS",
  "description": "Dịch vụ biển Tân Cảng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TOT",
  "description": "Vận tải Transimex",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TOW",
  "description": "Cấp nước Trà Nóc - Ô Môn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TPB",
  "description": "Ngân hàng Tiên Phong",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TPC",
  "description": "Nhựa Tân Đại Hưng",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TPE",
  "description": "Cơ điện Trần Phú",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TPH",
  "description": "In Sách giáo khoa TP.HN",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TPP",
  "description": "Nhựa Tân Phú",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TPS",
  "description": "Bến bãi vận tải Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TQN",
  "description": "Thông Quảng Ninh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TQW",
  "description": "Cấp thoát nước Tuyên Quang",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TR1",
  "description": "Vận Tải 1 Traco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TRA",
  "description": "Traphaco",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TRC",
  "description": "Cao su Tây Ninh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TRS",
  "description": "Vận tải & Dịch vụ Hàng Hải",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TRT",
  "description": "Trúc Thôn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TS3",
  "description": "Trường Sơn 532",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TS4",
  "description": "Thủy sản số 4",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TS5",
  "description": "Trường Sơn 145",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TSB",
  "description": "Ắc quy Tia Sáng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TSC",
  "description": "KT Nông nghiệp Cần Thơ",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TSD",
  "description": "Du lịch Trường Sơn Coecco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TSG",
  "description": "Tín hiệu Đường sắt Sài Gòn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TSJ",
  "description": "Hanoi Toserco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TST",
  "description": "DV Kỹ thuật Viễn Thông",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TSV",
  "description": "Việt Sáng tạo",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TTA",
  "description": "XD & PT Trường Thành",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TTB",
  "description": "Tập đoàn Tiến Bộ",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TTC",
  "description": "Gạch men Thanh Thanh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TTD",
  "description": "Bệnh viện Tim Tâm Đức",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TTE",
  "description": "ĐT Năng lượng Trường Thịnh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TTF",
  "description": "Gỗ Trường Thành",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TTG",
  "description": "May Thanh Trì",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TTH",
  "description": "T.Mại & Dịch vụ Tiến Thành",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TTL",
  "description": "TCT Thăng Long",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TTN",
  "description": "Công nghệ & Truyền thông VN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TTP",
  "description": "Bao bì nhựa Tân Tiến",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TTS",
  "description": "Cán thép Thái Trung",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TTT",
  "description": "Du lịch Thương Mại Tây Ninh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TTU",
  "description": "Dịch vụ Đô Thị Tân Thành",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TTZ",
  "description": "Xây dựng Tiến Trung",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TUG",
  "description": "Lai dắt & Vận tải Cảng HP",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TV1",
  "description": "Tư vấn Xây dựng Điện 1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TV2",
  "description": "Tư vấn Xây dựng Điện 2",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TV3",
  "description": "Tư vấn Xây dựng Điện 3",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TV4",
  "description": "Tư vấn Xây dựng Điện 4",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TV6",
  "description": "Xây lắp Điện Thịnh Vượng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TVA",
  "description": "Sứ Viglacera Thanh Trì",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TVB",
  "description": "Chứng khoán Trí Việt",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TVC",
  "description": "Tập đoàn Trí Việt",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TVD",
  "description": "Than Vàng Danh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TVG",
  "description": "Xây dựng Giao thông Vận tải",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TVH",
  "description": "Tư vấn XD công trình Hàng hải",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TVM",
  "description": "Tư vấn Đầu tư Mỏ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TVN",
  "description": "Thép Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TVP",
  "description": "Dược TV Pharm",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TVS",
  "description": "Chứng khoán Thiên Việt",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TVT",
  "description": "May Việt Thắng",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "TVW",
  "description": "Cấp thoát nước Trà Vinh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TW3",
  "description": "Dược Trung ương 3",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TXM",
  "description": "VICEM Thạch cao Xi măng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "TYA",
  "description": "Dây & Cáp điện Taya",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "UCT",
  "description": "Đô thị Cần Thơ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "UDC",
  "description": "PT Đô thị Bà Rịa - Vũng Tàu",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "UDJ",
  "description": "Becamex UDJ",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "UDL",
  "description": "Đô thị & Môi trường Đắk Lắk",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "UEM",
  "description": "Cơ điện Uông Bí - Vinacomin",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "UIC",
  "description": "PT Nhà & Đô Thị IDICO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "UMC",
  "description": "Công trình đô thị Nam Định",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "UNI",
  "description": "Viễn Liên",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "UPC",
  "description": "Cây xanh Vũng Tàu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "UPCOM",
  "description": "UPCOM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "UPH",
  "description": "Dược phẩm TW25",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "USC",
  "description": "Khảo sát & Xây dựng - USCO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "USD",
  "description": "Công trình Đô thị Sóc Trăng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "UTT",
  "description": "Môi trường Đô thị Thanh Trì",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "V11",
  "description": "VINACONEX No11",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "V12",
  "description": "VINACONEX 12",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "V15",
  "description": "Vinaconex 15",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "V21",
  "description": "Vinaconex 21",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "V45",
  "description": "Xây dựng số 45",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VAB",
  "description": "Ngân hàng Việt Á",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VAF",
  "description": "Phân lân Văn Điển",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VAT",
  "description": "Viễn thông Vạn Xuân",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VAV",
  "description": "VIWACO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VBB",
  "description": "VietBank",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VBC",
  "description": "Nhựa - Bao bì Vinh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VBG",
  "description": "Địa chất Việt Bắc - TKV",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VBH",
  "description": "Điện tử Bình Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VC1",
  "description": "Xây dựng số 1",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VC2",
  "description": "Đầu tư & Xây dựng VINA2",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VC3",
  "description": "Xây dựng Số 3",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VC5",
  "description": "Xây dựng Số 5",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VC6",
  "description": "Visicons",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VC7",
  "description": "Xây dựng Số 7",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VC9",
  "description": "Xây dựng số 9",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VCA",
  "description": "Thép VICASA - VNSTEEL",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VCB",
  "description": "Vietcombank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VCC",
  "description": "Vinaconex 25",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VCE",
  "description": "Xây lắp Môi trường - TKV",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VCF",
  "description": "Vinacafé Biên Hòa",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VCG",
  "description": "VINACONEX",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VCI",
  "description": "Chứng khoán Bản Việt",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VCM",
  "description": "VINACONEX MEC",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VCP",
  "description": "Xây dựng & Năng lượng VCP",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VCR",
  "description": "Vinaconex - ITC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VCS",
  "description": "VICOSTONE",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VCT",
  "description": "Tư vấn Xây dựng Vinaconex",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VCW",
  "description": "Nước sạch Vinaconex",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VCX",
  "description": "Xi măng Yên Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VDB",
  "description": "Vận tải & CB Than Đông Bắc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VDL",
  "description": "Thực phẩm Lâm Đồng",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VDM",
  "description": "Viện Nghiên cứu Dệt may",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VDN",
  "description": "Vinatex Đà Nẵng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VDP",
  "description": "Dược phẩm VIDIPHA",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VDS",
  "description": "Chứng khoán Rồng Việt",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VDT",
  "description": "Lưới thép Bình Tây",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VE1",
  "description": "VNECO 1",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VE2",
  "description": "Xây dựng Điện VNECO 2",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VE3",
  "description": "Xây dựng điện VNECO 3",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VE4",
  "description": "Xây dựng điện VNECO 4",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VE8",
  "description": "Xây dựng điện VNECO 8",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VE9",
  "description": "Đầu tư & Xây dựng VNECO 9",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VEA",
  "description": "VEAM CORP",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VEC",
  "description": "Điện tử & Tin học Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VEF",
  "description": "Triển lãm Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VEG",
  "description": "TCT Rau quả Nông sản",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VES",
  "description": "MÊ CA VNECO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VET",
  "description": "Thuốc thú y TW Navetco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VFC",
  "description": "Vận tải biển VINAFCO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VFG",
  "description": "Khử trùng Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VFR",
  "description": "Vận tải Vietfracht",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VFS",
  "description": "Chứng khoán Nhất Việt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VGC",
  "description": "Tổng Công ty Viglacera",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VGG",
  "description": "May Việt Tiến",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VGI",
  "description": "Đầu tư Quốc tế Viettel",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VGL",
  "description": "Vingal - Vnsteel",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VGP",
  "description": "Cảng Rau Quả",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VGR",
  "description": "Cảng xanh VIP",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VGS",
  "description": "Ống thép Việt Đức",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VGT",
  "description": "VINATEX",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VGV",
  "description": "Tư vấn Xây dựng Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VHC",
  "description": "Thủy sản Vĩnh Hoàn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VHD",
  "description": "PT Nhà & Đô thị Vinaconex",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VHE",
  "description": "Dược liệu & Thực phẩm VN",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VHF",
  "description": "Chế biến lương thực Vĩnh Hà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VHG",
  "description": "Đầu tư Cao su Quảng Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VHH",
  "description": "Kinh doanh nhà Thành Đạt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VHI",
  "description": "Kinh doanh & Đầu tư Việt Hà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VHL",
  "description": "Viglacera Hạ Long",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VHM",
  "description": "Vinhomes",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VIB",
  "description": "VIBBank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VIC",
  "description": "VinGroup",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VID",
  "description": "VIỄN ĐÔNG",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VIE",
  "description": "Viễn thông VITECO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VIF",
  "description": "Lâm nghiệp Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VIG",
  "description": "Chứng khoán T.Mại & CN VN",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VIH",
  "description": "Viglacera Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VIM",
  "description": "Khoáng sản Viglacera",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VIN",
  "description": "Kho vận ngoại thương VN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VIP",
  "description": "Vận tải Xăng dầu VIPCO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VIR",
  "description": "Du lịch Vũng Tàu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VIS",
  "description": "Thép Việt Ý",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VIT",
  "description": "Viglacera Tiên Sơn",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VIW",
  "description": "Nước & Môi trường Viwaseen",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VIX",
  "description": "Chứng khoán IB",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VJC",
  "description": "Vietjet Air",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VKC",
  "description": "Cáp nhựa Vĩnh Khánh",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VKD",
  "description": "Nước khoáng Khánh Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VKP",
  "description": "Nhựa Tân Hóa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VLA",
  "description": "PT Công nghệ Văn Lang",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VLB",
  "description": "Vật liệu xây dựng Biên Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VLC",
  "description": "Chăn nuôi Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VLF",
  "description": "Lương thực Vĩnh Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VLG",
  "description": "Vinalines Logistics Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VLP",
  "description": "CT Công cộng Vĩnh Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VLW",
  "description": "Cấp nước Vĩnh Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VMA",
  "description": "Ô tô Vinacomin",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VMC",
  "description": "VIMECO",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VMD",
  "description": "Dược Vimedimex",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VMG",
  "description": "Vimexco Gas",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VMI",
  "description": "Khoáng sản & Đầu tư VISACO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VMS",
  "description": "Phát triển Hàng Hải",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VMT",
  "description": "Giao nhận Vận tải Miền Trung",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VN30",
  "description": "VN30",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VN30F1M",
  "description": "VN30F1M",
  "type": "stock",
  "exchange": "Phái sinh"
},
{
  "name": "VN30F1Q",
  "description": "VN30F1Q",
  "type": "stock",
  "exchange": "Phái sinh"
},
{
  "name": "VN30F2M",
  "description": "VN30F2M",
  "type": "stock",
  "exchange": "Phái sinh"
},
{
  "name": "VN30F2Q",
  "description": "VN30F2Q",
  "type": "stock",
  "exchange": "Phái sinh"
},
{
  "name": "VNA",
  "description": "Vận tải biển Vinaship",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VNB",
  "description": "Sách Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VNC",
  "description": "VINACONTROL",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VND",
  "description": "Chứng khoán VNDIRECT",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VNE",
  "description": "Xây dựng điện Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VNF",
  "description": "VINAFREIGHT",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VNG",
  "description": "Du lịch Thành Thành Công",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VNH",
  "description": "Đầu tư Việt Việt Nhật",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VNI",
  "description": "VinaLand Invest Corp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VNINDEX",
  "description": "VNINDEX",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VNL",
  "description": "Logistics Vinalink",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VNM",
  "description": "VINAMILK",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VNP",
  "description": "Nhựa Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VNR",
  "description": "Tái bảo hiểm Quốc gia",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VNS",
  "description": "Ánh Dương Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VNT",
  "description": "Vận tải Ngoại thương",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VNX",
  "description": "Q.Cáo & Hội chợ Thương mại",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VNY",
  "description": "Thuốc thú y Trung ương I",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VOC",
  "description": "Dầu thực vật Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VOS",
  "description": "Vận tải Biển Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VPA",
  "description": "Vận tải Hóa dầu VP",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VPB",
  "description": "VPBank",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VPC",
  "description": "V- Power",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VPD",
  "description": "Phát triển Điện lực Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VPG",
  "description": "Xuất nhập khẩu Việt Phát",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VPH",
  "description": "Vạn Phát Hưng",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VPI",
  "description": "Đầu tư Văn Phú - Invest",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VPR",
  "description": "In & Thương mại Vina",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VPS",
  "description": "Thuốc sát trùng Việt Nam",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VPW",
  "description": "Cấp thoát nước số 1 Vĩnh Phúc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VQC",
  "description": "Giám định Vinaconmin",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VRC",
  "description": "Bất động sản & Đầu tư VRC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VRE",
  "description": "Vincom Retail",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VRG",
  "description": "PT Đô thị & KCN Cao su VN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VSA",
  "description": "Đại lý Hàng hải VN",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VSC",
  "description": "VICONSHIP",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VSE",
  "description": "DV Đường cao tốc Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VSF",
  "description": "Vinafood 2",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VSG",
  "description": "Container Phía Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VSH",
  "description": "Thủy điện Vĩnh Sơn Sông Hinh",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VSI",
  "description": "WASECO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VSM",
  "description": "Container Miền Trung",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VSN",
  "description": "VISSAN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VSP",
  "description": "ShinPetrol",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VST",
  "description": "VITRANSCHART",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTA",
  "description": "Gạch men VITALY",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTB",
  "description": "Viettronics Tân Bình",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VTC",
  "description": "Viễn thông VTC",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VTD",
  "description": "Du lịch Vietourist",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTE",
  "description": "Viễn thông Điện tử VINACAP",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTG",
  "description": "Du lịch Bà Rịa - Vũng Tàu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTH",
  "description": "Dây cáp điện Việt Thái",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VTI",
  "description": "Sản xuất - XNK Dệt may",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTJ",
  "description": "T.Mại & Đầu tư VINATABA",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VTK",
  "description": "Tư vấn thiết kế Viettel",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTL",
  "description": "Vang Thăng Long",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VTM",
  "description": "Đưa đón thợ mỏ - Vinacomin",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTO",
  "description": "VITACO",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VTP",
  "description": "Bưu chính Viettel",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTQ",
  "description": "Việt Trung Quảng Bình",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTR",
  "description": "Du lịch Vietravel",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTS",
  "description": "Viglacera Từ Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTV",
  "description": "Năng lượng Môi trường VICEM",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VTX",
  "description": "Vận tải Đa phương thức",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VTZ",
  "description": "Nhựa Việt Thành",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VUA",
  "description": "Chứng khoán Stanley Brothers",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VVN",
  "description": "Xây dựng Công nghiệp VN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VW1",
  "description": "Viwaseen.1",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VW3",
  "description": "VIWASEEN.3",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VWS",
  "description": "Nước & Môi trường Việt Nam",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VXB",
  "description": "Vật liệu xây dựng Bến Tre",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "VXP",
  "description": "Thuốc Thú y TW VETVACO",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VXT",
  "description": "Kho vận & DV Thương mại",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "WCS",
  "description": "Bến xe Miền Tây",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "WSB",
  "description": "Bia Sài Gòn - Miền Tây",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "WSS",
  "description": "Chứng khoán Phố Wall",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "WTC",
  "description": "Vận tải thủy Vinacomin",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "X20",
  "description": "May mặc X20",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "X26",
  "description": "Công ty 26",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "X77",
  "description": "Thành An 77",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "XDH",
  "description": "Đầu tư XD Dân dụng Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "XHC",
  "description": "Nội thất Xuân Hòa",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "XLV",
  "description": "Xây lắp & Dịch vụ Sông Đà",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "XMC",
  "description": "Bê tông Xuân Mai",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "XMD",
  "description": "Xuân Mai - Đạo Tú",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "XMP",
  "description": "Thủy điện Xuân Minh",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "XPH",
  "description": "Xà phòng Hà Nội",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "YBC",
  "description": "Xi măng & K.Sản Yên Bái",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "YBM",
  "description": "Khoáng sản CN Yên Bái",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "YEG",
  "description": "Tập đoàn Yeah1",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "YTC",
  "description": "Xuất nhập khẩu Y tế TP.HCM",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "NO1",
  "description": "Tập đoàn 911",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VNZ",
  "description": "CTCP VNG",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "GDA",
  "description": "Tôn Đông Á",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DSE",
  "description": "Chứng khoán DNSE",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "SBG",
  "description": "Siba Group JSC",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "AAH",
  "description": "Hợp Nhất",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BCR",
  "description": "BCG land",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "DLH",
  "description": "Ttc",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ESO",
  "description": "Vĩnh Cửu",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HIO",
  "description": "Helio Energy",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MBT",
  "description": "BĐS Cho thuê Minh Bảo Tín",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MTN",
  "description": "Thanh Nien Media Group Corp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "SBB",
  "description": "Bia Sài Gòn Bình Tây",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TAB",
  "description": "Freco .,corp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VMK",
  "description": "Vimarko",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VUG",
  "description": "Thủy Sản Việt Úc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "XD4",
  "description": "XD công trình 134",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FUCTVGF5",
  "description": "Quỹ đầu tư tăng trưởng Thiên Việt 5",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "QNP",
  "description": "Cảng Quy Nhơn",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "RYG",
  "description": "Sản Xuất Và Đầu Tư Hoàng Gia",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "CCC",
  "description": "Xây Dựng CDC",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "D17",
  "description": "Khai thác mỏ Đồng Tân",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TAL",
  "description": "Đầu Tư Bất Động Sản Taseco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FUEABVND",
  "description": "Quỹ ETF ABFVN DIAMOND",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUEKIVND",
  "description": "Quỹ ETF KIM GROWTH VN DIAMOND",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ABA",
  "description": "Giải pháp Thương mại A BA",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AIG",
  "description": "Nguyên liệu Á Châu AIG",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "AVG",
  "description": "Phân Bón Quốc Tế Âu Việt",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BGE",
  "description": "BCG Energy",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "BMK",
  "description": "Black Cat",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ECO",
  "description": "Ecoplastic VN",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "EGL",
  "description": "Urenco Gia Lam.,Jsc",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "HMD",
  "description": "Minh Duccsco",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ICL",
  "description": "Xuất Nhập Khẩu Vĩnh Long",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "ING",
  "description": "Đầu Tư Và Pt Xây Dựng",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MTX",
  "description": "Công Trình Đô Thị Gò Công",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "MZG",
  "description": "Miza Corp",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TLL",
  "description": "Dệt may Thắng Lợi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TNV",
  "description": "Xe đạp Thống Nhất",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TRH",
  "description": "BV GTVT",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TSA",
  "description": "Đầu Tư Và Xây Lắp Trường Sơn",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "TT6",
  "description": "Tien Thinh Group",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "UXC",
  "description": "Chế biến Thủy sản Út Xi",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "VDG",
  "description": "Vạn Đạt Group",
  "type": "stock",
  "exchange": "UPCOM"
},
{
  "name": "FUETCC50",
  "description": "Quỹ ETF TECHCOM CAPITAL VNX50",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "VPL",
  "description": "Vinpearl",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "ABA",
  "description": "Giải pháp Thương mại A BA",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "BHH",
  "description": "Habeco Trading 89",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "DKG",
  "description": "Vôi Công Nghiệp DLH",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "DSH",
  "description": "Dong Son Invest ., Jsc",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "EGL",
  "description": "Urenco Gia Lam.,Jsc",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "ICL",
  "description": "Xuất Nhập Khẩu Vĩnh Long",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "MZG",
  "description": "Miza Corp",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "RGG",
  "description": "Regal Group",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "SBC",
  "description": "Sabetran Jsc.",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "TLL",
  "description": "Dệt may Thắng Lợi",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "TNV",
  "description": "Xe đạp Thống Nhất",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "UXC",
  "description": "Chế biến Thủy sản Út Xi",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "VDG",
  "description": "Vạn Đạt Group",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "PAT",
  "description": "Phốt pho Apatit Việt Nam",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "TD6",
  "description": "Than Đèo Nai - Cọc Sáu - TKV",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DVT",
  "description": "Đào tạo nghiệp vụ Giao thông vận tải Bình Định",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "F88",
  "description": "F88.,jsc",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "TRV",
  "description": "Vận tải Đường sắt",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "CRV",
  "description": "Tập đoàn Bất động sản CRV",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "DDB",
  "description": "TM & XD Đông Dương",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "FUCTVGF4",
  "description": "Quỹ Đầu tư Tăng trưởng Thiên Việt 4",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUEBFVND",
  "description": "ETF BVFVN DIAMOND",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUEDCMID",
  "description": "Quỹ ETF DCVFMVNMIDCAP",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUEFCV50",
  "description": "Quỹ ETF FPT CAPITAL VNX50",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUEKIVFS",
  "description": "KIM GROWTH VNFINSELECT ETF",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "FUEMAVND",
  "description": "Quỹ ETF MAFM VNDIAMOND",
  "type": "stock",
  "exchange": "HOSE"
},
{
  "name": "NCG",
  "description": "Nova Consumer",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "BCH",
  "description": "Dược Bảo Châu",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "DVM",
  "description": "Dược liệu Việt Nam",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "MDD",
  "description": "CT Mai Động",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PCH",
  "description": "Nhựa Picomat",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "PPT",
  "description": "Petro Times",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "ABW",
  "description": "Chứng khoán An Bình",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "BHI",
  "description": "Bảo hiểm Sài Gòn - Hà Nội",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "CAR",
  "description": "Tập đoàn Giáo dục Trí Việt",
  "type": "stock",
  "exchange": "HNX"
},
{
  "name": "CCD",
  "description": "XD và Bảo trì cầu đường",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "CCS",
  "description": "Chíp Sáng",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "CMM",
  "description": "CAMIMEX CORP",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "DAL",
  "description": "TM Dịch Vụ Phát Triển Đông Á",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "DKW",
  "description": "Cấp nước Châu Thành",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "DMS",
  "description": "Dầu khí DMC Miền Nam",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "DSD",
  "description": "DHC Suối Đôi",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "DTH",
  "description": "Vật tư Y tế Thanh Hóa",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "FVN",
  "description": "Thiết kế và CN Việt Nam",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "G30",
  "description": "Gạch ngói 30-4",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "GCF",
  "description": "Thực phẩm G.C",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "GPC",
  "description": "Tập đoàn Green+",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "HCO",
  "description": "Bánh kẹo Hải Châu",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "HHI",
  "description": "Hoàng Hạc",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "HLO",
  "description": "Công Nghệ Ha Lô",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "IFA",
  "description": "Bảo hiểm Viễn Đông",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "KLC",
  "description": "Du lịch Kim Liên",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "LSG",
  "description": "BĐS Sài Gòn Vina",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "LTQ",
  "description": "Lâm nghiệp Nguyễn Văn Trỗi",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "MGR",
  "description": "Tập đoàn MGROUP",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "NEM",
  "description": "Thiết bị Điện Miền Bắc",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "TBW",
  "description": "Nước sạch Thái Bình",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "THM",
  "description": "Tứ Hải Hà Nam",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "TKD",
  "description": "Tư vấn thiết kế đường bộ",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "VVS",
  "description": "Đầu tư Phát triển Máy Việt Nam",
  "type": "stock",
  "exchange": "UPCoM"
},
{
  "name": "WTB",
  "description": "Thuỷ Điện To Buông",
  "type": "stock",
  "exchange": "UPCoM"
}];

exports.symbols = symbols;
function searchResultFromDatabaseItem(item) {
    return {
        symbol: item.name,
        full_name: item.name,
        description: item.description,
        exchange: item.exchange,
        type: item.type
    };
}

exports.search = function (searchString, type, exchange, maxRecords) {
    var MAX_SEARCH_RESULTS = !!maxRecords ? maxRecords : 50;
    var results = []; // array of WeightedItem { item, weight }
    var queryIsEmpty = !searchString || searchString.length === 0;
    var searchStringUpperCase = searchString.toUpperCase();

    for (var i = 0; i < symbols.length; ++i) {
        var item = symbols[i];

        if (type && type.length > 0 && item.type !== type) {
            continue;
        }
        if (exchange && exchange.length > 0 && item.exchange !== exchange) {
            continue;
        }

        var positionInName = item.name.toUpperCase().indexOf(searchStringUpperCase);
        var positionInDescription = item.description.toUpperCase().indexOf(searchStringUpperCase);

        if (queryIsEmpty || positionInName >= 0 || positionInDescription >= 0) {
            var found = false;
            for (var resultIndex = 0; resultIndex < results.length; resultIndex++) {
                if (results[resultIndex].item === item) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                var weight = positionInName >= 0 ? positionInName : 8000 + positionInDescription;
                results.push({item: item, weight: weight});
            }
        }
    }

    return results
        .sort(function (weightedItem1, weightedItem2) {
            return weightedItem1.weight - weightedItem2.weight;
        })
        .map(function (weightedItem) {
            return searchResultFromDatabaseItem(weightedItem.item);
        })
        .slice(0, Math.min(results.length, MAX_SEARCH_RESULTS));
};


exports.addSymbols = function (newSymbols) {
    symbols = symbols.concat(newSymbols);
};

exports.symbolInfo = function (symbolName) {

    var data = symbolName.split(':');
    var exchange = (data.length > 1 ? data[0] : "").toUpperCase();
    var symbol = (data.length > 1 ? data[1] : symbolName).toUpperCase();

    for (var i = 0; i < symbols.length; ++i) {
        var item = symbols[i];

        if (item.name.toUpperCase() === symbol && (exchange.length === 0 || exchange === item.exchange.toUpperCase())) {
            return item;
        }
    }

    return null;
};
