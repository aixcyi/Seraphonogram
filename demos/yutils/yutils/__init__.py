r"""
         __
        /\ \
       //\\ \
      // /\\ \
     // /  \\ \   __
    // /____\\ \// /
   // _______\\// /
  // /        ><-<
 // /        //\\ \
//_/        //_/\\_\

"""

from typing import Generator


def fibonacci(length: int) -> Generator[int, None, None]:
    """
    生成指定长度的斐波那契数列。
    """
    prev, current = 1, 1
    if length > 0:
        yield prev
    if length > 1:
        yield current
    while length > 2:
        prev, current, length = current, prev + current, length - 1
        yield current


if __name__ == '__main__':
    print(list(fibonacci(10)))
