export const WEDDING_INFO = {
    bride: {
      name: "Mai Tâm",
      family: {
        title: "Nhà Gái",
        father: {
          name: "Mai Huy Trực",
          title: "Ông"
        },
        mother: {
          name: "Mai Thị Dung",
          title: "Bà"
        }
      },
      ceremony: {
        title: "Lễ Vu Quy",
        time: "17:00",
        dayOfWeek: "Thứ 6",
        date: "23/1",
        venue: {
            name: "TƯ GIA NHÀ GÁI",
            address: "SN01, ngõ 102, QL10, thôn Yên Khoái, xã Nga Sơn, tỉnh Thanh Hóa",
            location: ""
        }
      },
    },
    groom: {
      name: "Mạnh Hoàng",
      family: {
        title: "Nhà Trai",
        father: {
          name: "Trần Mạnh Hùng",
          title: "Ông"
        },
        mother: {
          name: "Đặng Thị Thảo",
          title: "Bà"
        }
      },
      ceremony:  {
        title: "Lễ Thành Hôn",
        time: "11:00",
        dayOfWeek: "Thứ 7",
        date: "24/1",
        venue: {
            name: "TƯ GIA NHÀ TRAI",
            address: "Xóm Bắc Thịnh, xã Đông Lộc, tỉnh Nghệ An",
            location: ""
        }
      }
    },
    weddingDate: {
      dayOfWeek: "THỨ 7",
      date: "24/01",
      year: "2026",
      lunarDate: "Ngày 06 tháng 12 năm Ất Tỵ"
    },
  };
  
  export type WeddingInfo = typeof WEDDING_INFO;