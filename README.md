# toggle-zod-validation-sample

- 概要
  - resolver に zod を使用した react-hook-form を使用
  - フォームサンプルを作成
- 構成
  - フォーム
    - ラーメン
      - 味を選んでください
      - 味フィールド
        - 量を選んでください
        - 量フィールド
          - トッピングを選んでください
          - トッピングフィールド
  - フィールド
    - 味 (required radio)
      - 塩、味噌、醤油、この中に無い、おまかせ
    - 量 (required radio)
      - 小盛り、並盛り、大盛り
    - トッピングフィールド (optional checkbox)
      - にんにく、生姜、生クリーム、チョコレート
- 難点
  - 変更時の子のリセット
    - 引き金及び対象
      - 味
        - 量、トッピング
      - 量
        - トッピング
    - 実現方法
      - onChange ハンドラーで resetField を実行する
  - 量フィールドが不要な味フィールドのバリデーションパス
    - 実現方法
      - 量フィールドを必要としないという情報を schema 定義関数に渡す
