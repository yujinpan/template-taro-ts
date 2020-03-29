import Taro from "@tarojs/taro";

export function showToast(message: string) {
  // 延迟执行，防止被 hideLoading 关闭了
  setTimeout(() => {
    Taro.showToast({
      icon: "none",
      title: message,
      duration: 2500
    });
  }, 300);
}

export function showLoading(message: string) {
  Taro.showLoading({
    title: message || "加载中..."
  });
}

export function hideLoading() {
  Taro.hideLoading();
}
