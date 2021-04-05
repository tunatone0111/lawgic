import logging


def get_logger(logname="etc"):
    logger = logging.getLogger('logger')
    logger.addHandler(logging.FileHandler(filename=f'logs/{logname}.log'))
    return logger
