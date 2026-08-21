import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  declare props: Props;
  declare state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Looply ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border-2 border-[#ECE8FD] space-y-6">
            <div className="w-20 h-20 bg-[#ECE8FD] text-[#633BE8] rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
              ✨
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-[#2A2B47]">
                عذراً، حدث خطأ غير متوقع!
              </h1>
              <p className="text-sm font-bold text-[#73758C]">
                Oops! Something went unexpected. Don't worry, your progress is saved.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-[#FAFAFD] p-3 rounded-xl border border-[#ECE8FD] text-left text-xs font-mono text-[#73758C] overflow-x-auto max-h-24">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={this.handleReload}
                className="px-6 py-3 bg-gradient-to-r from-[#FF7A00] to-[#FF4D8D] text-white font-extrabold rounded-2xl shadow-md hover:opacity-90 active:scale-95 transition-all text-sm"
              >
                إعادة تحميل الصفحة 🔄
              </button>
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-[#ECE8FD] text-[#633BE8] font-extrabold rounded-2xl hover:bg-[#9C7AF2]/20 active:scale-95 transition-all text-sm"
              >
                العودة للرئيسية 🏠
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
