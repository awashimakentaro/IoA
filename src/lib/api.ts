export async function getPropertyData(id: string) {
  // この関数は実際のデータフェッチに置き換える必要があります
  return {
    id,
    name: "サンシャインマンション",
    address: "東京都新宿区西新宿1-1-1",
    image: "/images/property-image.jpg",
    rating: 4.5,
    reviews: [
      { id: 1, user: "Aさん", rating: 5, comment: "駅から近くて便利です。部屋も清潔で快適でした。" },
      {
        id: 2,
        user: "Bさん",
        rating: 4,
        comment: "周辺の環境が良く、静かで住みやすいです。ただ、家賃が少し高めかな。",
      },
      { id: 3, user: "Cさん", rating: 4, comment: "管理人さんの対応が丁寧で安心して住めます。設備は少し古いかも。" },
    ],
  }
}

