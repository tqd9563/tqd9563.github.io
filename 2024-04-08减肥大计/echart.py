import pandas as pd
import json
import os

WORK_DIR = os.getcwd()


def read_csv():
    filename = f'{WORK_DIR}/weight.csv'
    print(f'filename={filename}')
    df = pd.read_csv(filename, header=None)
    df.columns = ['dt', 'weight']
    return df

def interpolate(df):
    df['dt'] = pd.to_datetime(df['dt'], errors='coerce')
    df['date'] = df['dt'].dt.strftime('%m-%d')
    # 设置日期列为索引
    df.set_index('date', inplace=True)
    # 对weight列进行线性插值
    df['weight'] = df['weight'].interpolate(method='linear')
    # 重置索引，如果你不想让日期列成为索引
    df.reset_index(inplace=True)
    return df

def transform(df):
    res = {
        "title": {
            "text": "XX体重变化趋势图（3月）",
            "top": "2%",
            "left": "center"
        },
        "tooltip": {
            "trigger": "axis"
        },
        "legend": {
            "data": ["每日体重（单位: g）"],
            "top": "10%"
        },
        "grid": {
            "left": "5%",
            "right": "5%",
            "bottom": "5%",
            "top": "20%",
            "containLabel": True
        },
        "toolbox": {
            "feature": {
                "saveAsImage": {
                    "title": "保存为图片"
                }
            }
        },
        "xAxis": {
            "type": "category",
            "boundaryGap": False,
            "name": "日期",
            "data": df['date'].to_list()
        },
        "yAxis": {
            "type": "value",
            "name": "体重(单位:g)",
            "min": 110
        },
        "series": [
            {
                "name": "体重",
                "type": "line",
                "stack": "总量",
                "data": df['weight'].to_list()
            }
        ]
    }
    
    return res


if __name__ == '__main__':
    df = read_csv()
    df = interpolate(df)
    res = transform(df)
    filename = f'{WORK_DIR}/echart.json'
    # 写入JSON数据
    with open(filename, 'w') as f:
        json.dump(res, f)